  import { Prisma } from '@prisma/client';
  import { prisma } from '../lib/prisma';

const createRecipe = async (data: Prisma.recipesCreateInput) => {
  return await prisma.recipes.create({ data });
};

// UC-04: View Homepage (Menampilkan resep terbaru)
const getAllRecipes = async () => {
  return await prisma.recipes.findMany({
    include: {
      author: {
        select: { username: true, full_name: true },
      },
    },
    orderBy: { created_at: 'desc' }, 
  });
};

// UC-05: Search Recipe
// Menambahkan fitur pencarian berdasarkan judul resep
const searchRecipes = async (query: string) => {
  return await prisma.recipes.findMany({
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
const getRecipeById = async (id: number) => {
  return await prisma.recipes.findUnique({
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

// Tambahan: Mengambil resep berdasarkan User ID (untuk halaman Profile UC-03)
const getRecipesByAuthor = async (authorId: number) => {
  return await prisma.recipes.findMany({
    where: { author_id: authorId },
    orderBy: { created_at: 'desc' }
  });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  searchRecipes,
  getRecipeById,
  getRecipesByAuthor
};