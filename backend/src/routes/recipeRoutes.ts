import { Router } from 'express';
import { createRecipe, getAllRecipes, getRecipeDetail } from '../controllers/recipeControllers';

const router = Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeDetail);
router.post('/create-recipe', createRecipe);

export default router;