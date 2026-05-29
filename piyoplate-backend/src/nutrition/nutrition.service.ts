import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from '../dto/create-log.dto';

@Injectable()
export class NutritionService {
  constructor(private readonly prisma: PrismaService) {}

  async addLog(userId: number, dto: CreateLogDto) {
    const log = await this.prisma.nutrition_logs.create({
      data: {
        user_id: userId,
        recipe_id: dto.recipe_id ?? null,
        food_name: dto.food_name ?? null,
        calories_added: dto.calories_added,
      },
      include: {
        recipe: { select: { title: true } },
      },
    });

    return {
      message: 'Log berhasil ditambahkan',
      data: log,
    };
  }

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

  async getDailySummary(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { daily_calorie_goal: true },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await this.prisma.nutrition_logs.aggregate({
      where: {
        user_id: userId,
        logged_at: { gte: today },
      },
      _sum: { calories_added: true },
    });

    const consumed = result._sum.calories_added ?? 0;
    const goal = user.daily_calorie_goal ?? 2000;
    const remaining = goal - consumed;

    return {
      daily_goal: goal,
      total_consumed: consumed,
      remaining_calories: remaining,
      status: consumed > goal ? 'Overlimit' : 'On Track',
    };
  }

  async getWeeklySummary(userId: number) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const logs = await this.prisma.nutrition_logs.findMany({
      where: {
        user_id: userId,
        logged_at: { gte: sevenDaysAgo },
      },
      select: { calories_added: true, logged_at: true },
      orderBy: { logged_at: 'asc' },
    });

    // Group by day
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days[key] = 0;
    }

    for (const log of logs) {
      const key = log.logged_at.toISOString().split('T')[0];
      if (days[key] !== undefined) {
        days[key] += log.calories_added;
      }
    }

    return Object.entries(days).map(([date, total_calories]) => ({
      date,
      total_calories,
    }));
  }
}
