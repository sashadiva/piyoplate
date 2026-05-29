import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(search?: string) {
    return this.prisma.recipes.findMany({
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
        author: {
          select: { id: true, username: true, profile_picture_url: true },
        },
        _count: { select: { reviews: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getRecipeDetail(id: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, profile_picture_url: true },
        },
        reviews: {
          select: { rating: true, comment: true, user: { select: { username: true } }, createdAt: true },
          orderBy: { createdAt: 'desc' },
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
    return this.prisma.recipes.create({
      data: {
        author_id: authorId,
        title: data.title,
        cuisine_type: data.cuisine_type,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        calories_per_serving: data.calories_per_serving,
        cook_time_minutes: data.cook_time_minutes,
        image_url: data.image_url,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });
  }

  async cookRecipe(userId: number, recipeId: number) {
    return this.prisma.$transaction(async (tx) => {
      const recipe = await tx.recipes.findUnique({ where: { id: recipeId } });
      if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

      const log = await tx.nutrition_logs.create({
        data: {
          user_id: userId,
          recipe_id: recipeId,
          calories_added: recipe.calories_per_serving,
          food_name: recipe.title,
        },
      });

      return {
        message: `Berhasil memasak ${recipe.title}!`,
        added_calories: recipe.calories_per_serving,
        log,
      };
    });
  }
}
