import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { CreatePhotoLogDto } from '../dto/create-photo-log.dto';
import { log_source } from '@prisma/client';

export type LogSource = 'recipe' | 'manual' | 'photo';

@Injectable()
export class NutritionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  // ── 1. LOG DARI TOMBOL "COOK" ─────────────────────────────────────────────
  // Dipanggil oleh RecipesService setelah user masak resep.
  // Source: 'recipe'
  async logFromCook(
    userId: number,
    recipeId: number,
  ): Promise<{ message: string; added_calories: number; log: any }> {
    return this.prisma.$transaction(async (tx) => {
      const recipe = await tx.recipes.findUnique({ where: { id: recipeId } });
      if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

      const log = await tx.nutrition_logs.create({
        data: {
          user_id: userId,
          recipe_id: recipeId,
          food_name: recipe.title,
          calories_added: recipe.calories_per_serving,
          source: 'recipe',
        },
        include: {
          recipe: { select: { title: true, image_url: true } },
        },
      });

      return {
        message: `Berhasil memasak ${recipe.title}! +${recipe.calories_per_serving} kkal`,
        added_calories: recipe.calories_per_serving,
        log,
      };
    });
  }

  // ── 2. LOG MANUAL ─────────────────────────────────────────────────────────
  // User input nama makanan + kalori sendiri (quick add / manual entry)
  // Source: 'manual'
  async logManual(
    userId: number,
    dto: CreateLogDto,
  ): Promise<{ message: string; data: any }> {
    const log = await this.prisma.nutrition_logs.create({
      data: {
        user_id: userId,
        recipe_id: dto.recipe_id ?? null,
        food_name: dto.food_name,
        calories_added: dto.calories_added,
        source: dto.source as log_source ?? 'manual',
      },
      include: {
        recipe: { select: { title: true } },
      },
    });

    return {
      message: `${dto.food_name} (${dto.calories_added} kkal) berhasil ditambahkan`,
      data: log,
    };
  }

  // ── 3. LOG DARI FOTO (AI) ─────────────────────────────────────────────────
  // User upload foto → Claude Vision deteksi makanan & estimasi kalori
  // Source: 'photo'
  async logFromPhoto(
    userId: number,
    dto: CreatePhotoLogDto,
  ): Promise<{
    ai_result: {
      food_name: string;
      calories_estimated: number;
      confidence: string;
      breakdown: string;
      portion_note: string;
    };
    message?: string;
    data?: any;
  }> {
    // Minta Claude analisis foto
    const aiResult = await this.aiService.estimateCaloriesFromPhoto(
      dto.image_base64,
      dto.media_type || 'image/jpeg',
      dto.portion_note,
    );

    if (aiResult.calories_estimated === 0) {
      return {
        message: 'Makanan tidak berhasil terdeteksi di foto. Coba foto lebih jelas.',
        ai_result: aiResult,
        data: null,
      };
    }

    return { 
      ai_result: aiResult
    };
  }

  // ── HISTORY ───────────────────────────────────────────────────────────────
  async getHistory(userId: number) {
    return this.prisma.nutrition_logs.findMany({
      where: { user_id: userId },
      orderBy: { logged_at: 'desc' },
      take: 50,
      include: {
        recipe: { select: { title: true, image_url: true } },
      },
    });
  }

  // ── DAILY SUMMARY ─────────────────────────────────────────────────────────
  async getDailySummary(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { daily_calorie_goal: true },
    });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [result, todayLogs] = await Promise.all([
      this.prisma.nutrition_logs.aggregate({
        where: { user_id: userId, logged_at: { gte: today } },
        _sum: { calories_added: true },
      }),
      this.prisma.nutrition_logs.findMany({
        where: { user_id: userId, logged_at: { gte: today } },
        orderBy: { logged_at: 'desc' },
        select: {
          id: true,
          user_id: true,
          recipe_id: true,
          food_name: true,
          calories_added: true,
          logged_at: true,
          source: true,
          ai_confidence: true,
          ai_breakdown: true,
          recipe: { select: { title: true, image_url: true } },
        },
      }),
    ]);

    const consumed = result._sum.calories_added ?? 0;
    const goal = user.daily_calorie_goal ?? 2000;
    const remaining = goal - consumed;

    // Breakdown by source
    const bySource = todayLogs.reduce(
      (acc, log) => {
        const src = log.source || 'manual';
        acc[src] = (acc[src] || 0) + log.calories_added;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      daily_goal: goal,
      total_consumed: consumed,
      remaining_calories: remaining,
      status: consumed > goal ? 'Overlimit' : 'On Track',
      progress_percent: Math.min(100, Math.round((consumed / goal) * 100)),
      by_source: {
        from_recipe: bySource['recipe'] ?? 0,
        from_manual: bySource['manual'] ?? 0,
        from_photo: bySource['photo'] ?? 0,
      },
      logs: todayLogs,
    };
  }

  // ── WEEKLY SUMMARY ────────────────────────────────────────────────────────
  async getWeeklySummary(userId: number) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const logs = await this.prisma.nutrition_logs.findMany({
      where: { user_id: userId, logged_at: { gte: sevenDaysAgo } },
      select: { calories_added: true, logged_at: true, source: true, food_name: true },
      orderBy: { logged_at: 'asc' },
    });

    // Build 7 hari terakhir
    const days: Record<string, { total_calories: number; logs_count: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days[key] = { total_calories: 0, logs_count: 0 };
    }

    for (const log of logs) {
      const key = log.logged_at.toISOString().split('T')[0];
      if (days[key] !== undefined) {
        days[key].total_calories += log.calories_added;
        days[key].logs_count += 1;
      }
    }

    return Object.entries(days).map(([date, data]) => ({
      date,
      ...data,
    }));
  }

  // ── MONTHLY SUMMARY ───────────────────────────────────────────────────────
  async getMonthlySummary(userId: number) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { daily_calorie_goal: true },
    });

    const logs = await this.prisma.nutrition_logs.findMany({
      where: { user_id: userId, logged_at: { gte: thirtyDaysAgo } },
      include: { recipe: { select: { title: true } } },
      orderBy: { logged_at: 'desc' },
    });

    const total = logs.reduce((sum, l) => sum + l.calories_added, 0);
    const daysWithData = new Set(logs.map((l) => l.logged_at.toISOString().split('T')[0])).size;
    const goal = user?.daily_calorie_goal ?? 2000;

    // Makanan terbanyak
    const foodMap: Record<string, number> = {};
    for (const log of logs) {
      const name = log.food_name || log.recipe?.title || 'Unknown';
      foodMap[name] = (foodMap[name] || 0) + log.calories_added;
    }
    const topFoods = Object.entries(foodMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([food_name, total_calories]) => ({ food_name, total_calories }));

    return {
      total_calories: total,
      average_per_day: daysWithData > 0 ? Math.round(total / daysWithData) : 0,
      days_tracked: daysWithData,
      daily_goal: goal,
      on_track_days: 0, // placeholder — bisa dihitung lebih detail
      top_foods: topFoods,
      recent_logs: logs.slice(0, 20),
    };
  }

  // ── DELETE LOG ────────────────────────────────────────────────────────────
  async deleteLog(userId: number, logId: number) {
    const log = await this.prisma.nutrition_logs.findUnique({
      where: { id: logId },
    });
    if (!log) throw new NotFoundException('Log tidak ditemukan');
    if (log.user_id !== userId) throw new NotFoundException('Log tidak ditemukan');

    await this.prisma.nutrition_logs.delete({ where: { id: logId } });
    return { message: 'Log berhasil dihapus' };
  }
}
