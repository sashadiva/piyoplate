import { prisma } from '../lib/prisma';

const logNutrition = async (userId: number, recipeId: number, calories: number) => {
  return await prisma.nutrition_logs.create({
    data: {
      user_id: userId,
      recipe_id: recipeId,
      calories_added: calories,
    },
    include: {
      recipe: {
        select: { title: true } // Mengembalikan judul resep untuk konfirmasi di Flutter
      }
    }
  });
};

const getDailyLogs = async (userId: number) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.nutrition_logs.findMany({
    where: {
      user_id: userId,
      logged_at: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      recipe: {
        select: { 
          title: true, 
          calories_per_serving: true 
        }
      }
    },
    orderBy: { logged_at: 'desc' }
  });
};


const getDailySummary = async (userId: number) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // 1. Hitung total kalori dari log
  const aggregate = await prisma.nutrition_logs.aggregate({
    where: {
      user_id: userId,
      logged_at: {
        gte: startOfDay,
      },
    },
    _sum: {
      calories_added: true,
    },
  });

  // 2. Ambil target kalori harian dari profil user
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { daily_calorie_goal: true }
  });

  return {
    totalCalories: aggregate._sum.calories_added || 0,
    dailyGoal: user?.daily_calorie_goal || 2000,
    remaining: (user?.daily_calorie_goal || 2000) - (aggregate._sum.calories_added || 0)
  };
};


const deleteLog = async (logId: number, userId: number) => {
  return await prisma.nutrition_logs.deleteMany({
    where: {
      id: logId,
      user_id: userId, // Memastikan user hanya bisa menghapus log miliknya sendiri
    },
  });
};

module.exports = {
  logNutrition,
  getDailyLogs,
  getDailySummary,
  deleteLog
};