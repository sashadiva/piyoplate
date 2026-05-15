import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async cookRecipe(userId: number, recipeId: number) {
  return this.prisma.$transaction(async (tx) => {
    // 1. Cari data resepnya untuk ambil jumlah kalori
    const recipe = await tx.recipes.findUnique({ where: { id: recipeId } });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');

    // 2. Tambahkan ke Log Nutrisi User
    const log = await tx.nutrition_logs.create({
      data: {
        user_id: userId,
        recipe_id: recipeId,
        calories_added: recipe.calories_per_serving,
      },
    });
    return {
      message: `Berhasil memasak ${recipe.title}!`,
      added_calories: recipe.calories_per_serving,
      log_details: log
    };
  });
}

  async getAll(search?: string) {
    return this.prisma.recipes.findMany({
      where: search ? { title: { contains: search } } : {},
      include: {
        author: {
          select: { username: true }
        }
      }
    });
  }

async getRecipeDetail(id: number) {
  const recipe = await this.prisma.recipes.findUnique({
    where: { id },
    include: {
      reviews: {
        select: { rating: true }
      }
    }
  });

  if (!recipe) throw new NotFoundException('Resep tidak ditemukan');
  const reviews = recipe.reviews || [];
  
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
    : 0;

  return { 
    ...recipe, 
    avgRating: Number(avgRating.toFixed(1)) 
  };
}

  async create(data: CreateRecipeDto) {
    return this.prisma.recipes.create({
      data: data
    });
  }

  async search(query: string) {
    return this.prisma.recipes.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { ingredients: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        _count: { select: { reviews: true } }, // Lihat jumlah review
      }
  });
}
}