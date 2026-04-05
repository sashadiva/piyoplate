import { Request, Response } from 'express';

const recipeService = require('../services/recipeServices');
const createRecipe = async (req: Request, res: Response) => {
  try {
    // Di aplikasi nyata, author_id biasanya diambil dari token JWT (req.user.id)
    // Image_url & video_url didapat setelah upload ke Cloud Storage
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json({ success: true, message: "Resep berhasil diposting!", data: newRecipe });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json({ success: true, data: recipes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRecipeDetail = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: "Resep tidak ditemukan" });
    res.status(200).json({ success: true, data: recipe });
  } catch (error : any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeDetail };