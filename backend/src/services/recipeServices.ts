import { prisma } from '../lib/prisma';

const createRecipe = async (data) => {
  return await prisma.recipes.create({
    data: {
      author_id: data.author_id,
      title: data.title,
      description: data.description,
      calories_per_serving: data.calories_per_serving,
      cook_time_minutes: data.cook_time_minutes,
      ingredients: data.ingredients, // String/JSON
      instructions: data.instructions, // String/JSON
      image_url: data.image_url,
      video_url: data.video_url,
    },
  });
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

const getRecipeById = async (id) => {
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