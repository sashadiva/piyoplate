import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

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