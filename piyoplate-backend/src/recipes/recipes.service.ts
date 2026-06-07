import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { AiService } from '../ai/ai.service';
import { NutritionService } from '../nutrition/nutrition.service';
import { EstimateCaloriesDto } from 'src/dto/estimate-calories.dto';

@Injectable()
export class RecipesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly nutritionService: NutritionService,
  ) {}

  async getAll(search?: string) {
    const recipes = await this.prisma.recipes.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { ingredients: { contains: search, mode: 'insensitive' } },
              { cuisine_type: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        author: { select: { id: true, username: true, profile_picture_url: true } },
        reviews: { select: { rating: true } },
        _count: { select: { reviews: true, bookmarks: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    return recipes.map((recipe) => {
      const avgRating =
        recipe.reviews.length > 0
          ? recipe.reviews.reduce((acc, r) => acc + r.rating, 0) / recipe.reviews.length
          : 0;
      const { reviews, ...rest } = recipe;
      return {
        ...rest,
        avgRating: Number(avgRating.toFixed(1)),
      };
    });
  }

  async getRecipeDetail(id: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, profile_picture_url: true } },
        reviews: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { id: true, username: true, profile_picture_url: true } },
          },
        },
        _count: { select: { reviews: true, bookmarks: true } },
      },
    });

    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

    const avgRating =
      recipe.reviews.length > 0
        ? recipe.reviews.reduce((acc, r) => acc + r.rating, 0) / recipe.reviews.length
        : 0;

    return {
      ...recipe,
      avgRating: Number(avgRating.toFixed(1)),
    };
  }

  async create(authorId: number, data: CreateRecipeDto) {
    let caloriesPerServing = data.calories_per_serving;
    let aiCalorieBreakdown: string | null = null;

    if (data.use_ai_calories) {
      const aiResult = await this.aiService.estimateCaloriesFromIngredients(
        data.ingredients,
        data.title,
        data.servings ?? 1,
      );
      caloriesPerServing = aiResult.calories_per_serving;
      aiCalorieBreakdown = aiResult.breakdown;
    }

    return this.prisma.recipes.create({
      data: {
        author_id: authorId,
        title: data.title,
        cuisine_type: data.cuisine_type,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        calories_per_serving: caloriesPerServing,
        cook_time_minutes: data.cook_time_minutes,
        image_url: data.image_url,
        ai_calorie_breakdown: aiCalorieBreakdown,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async previewCalorieEstimate(dto: EstimateCaloriesDto) {
    const result = await this.aiService.estimateCaloriesFromIngredients(
      dto.ingredients,
      dto.title,
      dto.servings ?? 1,
    );
    return {
      message: 'Estimasi kalori berhasil',
      ...result,
    };
  }

  async cookRecipe(userId: number, recipeId: number) {
    return this.nutritionService.logFromCook(userId, recipeId);
  }
}