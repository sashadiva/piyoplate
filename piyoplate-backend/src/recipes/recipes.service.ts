import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {

  constructor(private prisma: PrismaService) {}

  createRecipe = async (data: Prisma.recipesCreateInput) => {
    return await this.prisma.recipes.create({ data });
  };

  getAllRecipes = async () => {
  return await this.prisma.recipes.findMany({
    include: {
      author: {
        select: { username: true, full_name: true },
      },
    },
    orderBy: { created_at: 'desc' }, 
  });
};
  searchRecipes = async (query: string) => {
  return await this.prisma.recipes.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } }
      ]
    },
    include: {
      author: { select: { username: true } }
    }
  });
};

// UC-07: View Recipe (Detail resep)
  getRecipeById = async (id: number) => {
  return await this.prisma.recipes.findUnique({
    where: { id: id },
    include: {
      author: {
        select: { 
          username: true,
          image_url: true // Untuk subflow S-5: View Poster's Profile
        },
      },
    },
  });
};


getRecipesByAuthor = async (authorId: number) => {
  return await this.prisma.recipes.findMany({
    where: { author_id: authorId },
    orderBy: { created_at: 'desc' }
  });
}
}
