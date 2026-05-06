import { Request, Response } from 'express';
import * as recipeService from '../services/recipeServices';
import { sendSuccess, sendError } from '../utils/responseHandler';

// UC-06: Post Recipe[cite: 1]
export const createRecipe = async (req: Request, res: Response) => {
  try {
    // Di Flutter, pastikan mengirim author_id dalam body[cite: 1]
    const newRecipe = await recipeService.createRecipe(req.body);
    return sendSuccess(res, "Resep berhasil diposting!", newRecipe, 201);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

// UC-04 & UC-05: View Homepage & Search[cite: 1]
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let recipes;

    if (search) {
      recipes = await recipeService.searchRecipes(search as string); // UC-05[cite: 1]
    } else {
      recipes = await recipeService.getAllRecipes(); // UC-04[cite: 1]
    }

    return sendSuccess(res, "Berhasil mengambil resep", recipes);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

// UC-07: View Recipe Detail[cite: 1]
export const getRecipeDetail = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(Number(req.params.id));
    if (!recipe) return sendError(res, "Resep tidak ditemukan", 404);
    
    return sendSuccess(res, "Detail resep ditemukan", recipe);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};