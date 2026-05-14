import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from '../dto/create-log.dto';

@Injectable()
export class NutritionService {
  constructor(private prisma: PrismaService) {}

  async addLog(userId: number, dto: CreateLogDto) {
    return this.prisma.$transaction(async (tx) => {
      
      const newLog = await tx.nutrition_logs.create({
        data: {
          user_id: userId,
          recipe_id: dto.recipe_id ?? null,
          food_name: dto.food_name ?? null,
          calories_added: dto.calories_added, 
        },
      });
      return {
        message: "Log recorded successfully within transaction",
        data: newLog
      };
    });
  }

  async getHistory(userId: number) {
    return this.prisma.nutrition_logs.findMany({
      where: { user_id: userId },
      orderBy: { logged_at: 'desc' },
      take: 20, // Ambil 20 riwayat terakhir
      include: {
        recipe: { select: { title: true } }
      }
    });
  }
  async getDailySummary(userId: number) {
    // 1. Ambil target kalori user
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { daily_calorie_goal: true },
    });

    if (!user) throw new NotFoundException('User tidak ditemukan');

    // 2. Hitung total kalori yang sudah dimakan hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logs = await this.prisma.nutrition_logs.aggregate({
      where: {
        user_id: userId,
        logged_at: { gte: today },
      },
      _sum: { calories_added: true },
    });

    const consumed = logs?._sum?.calories_added ?? 0;
    const goal = user.daily_calorie_goal ?? 2000; // Default 2000 jika belum diatur

    return {
      daily_goal: goal,
      total_consumed: consumed,
      remaining_calories: goal - consumed,
      status: consumed > goal ? 'Overlimit' : 'On Track',
    };
  }

}