import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NutritionService {
    constructor(private prisma: PrismaService) {}

  async logDaily(data: any) {
    return this.prisma.nutrition_logs.create({ data });
  }

  async getSummary(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logs = await this.prisma.nutrition_logs.aggregate({
      where: { user_id: userId, logged_at: { gte: today } },
      _sum: { calories_added: true }
    });

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { daily_calorie_goal: true }
    });

    return {
      consumed: logs._sum.calories_added || 0,
      goal: user.daily_calorie_goal,
      remaining: user.daily_calorie_goal - (logs._sum.calories_added || 0)
    };
  }
}
