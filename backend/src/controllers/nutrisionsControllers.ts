import { Request, Response } from 'express';
import * as nutritionService from '../services/nutrisionsService';
import { sendSuccess, sendError } from '../utils/responseHandler';

// UC-08: Log Daily Calorie[cite: 1]
export const addDailyLog = async (req: Request, res: Response) => {
  try {
    const { userId, recipeId, calories } = req.body;
    const log = await nutritionService.logNutrition(userId, recipeId, calories);
    return sendSuccess(res, "Kalori berhasil dicatat!", log, 201);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

// UC-08: Get Summary (Untuk Progress Bar di Flutter)[cite: 1]
export const getCalorieSummary = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const summary = await nutritionService.getDailySummary(userId);
    return sendSuccess(res, "Berhasil mengambil ringkasan kalori", summary);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};