import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

const createRecipe = async (data: Prisma.recipesCreateInput) => {
   return await prisma.recipes.create({ data });
};

const getAllRecipes = async () => {
  // Mengambil semua resep sekaligus menyertakan nama pembuatnya
  return await prisma.recipes.findMany({
    include: {
      author: {
        select: { username: true, full_name: true },
      },
    },
    orderBy: { created_at: 'desc' }, // Resep terbaru di atas
  });
};

const getRecipeById = async (id: number) => {
  return await prisma.recipes.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
};

module.exports = { createRecipe, getAllRecipes, getRecipeById };