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

  async getDetail(id: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id },
      include: {
        author: { select: { username: true } }
      }
    });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan');
    return recipe;
  }

  async create(data: CreateRecipeDto) {
    return this.prisma.recipes.create({
      data: data
    });
  }
}