import { prisma } from '../lib/prisma';
import { hashPassword } from '../utils/auth';

export const createUser = async (userData: any) => {
  const hashedPassword = await hashPassword(userData.password);
  
  return await prisma.users.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      full_name: userData.full_name || null,
      daily_calorie_goal: userData.daily_calorie_goal || 2000, // Default target kalori
      role: 'user' // Default role saat mendaftar
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true
      // Password sengaja tidak di-select agar tidak terkirim ke frontend
    }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email }
  });
};

export const getUserProfile = async (userId: number) => {
  return await prisma.users.findUnique({
    where: { id: userId },
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          image_url: true,
          calories_per_serving: true
        }
      }
    }
  });
};

export const getAllUsers = async () => {
  return await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true
    }
  });
};

/**
 * Update Profile (S-1 Change Account Settings di UC-03)
 * Mengupdate informasi user seperti target kalori atau nama lengkap.
 */
export const updateUser = async (userId: number, updateData: any) => {
  return await prisma.users.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      username: true,
      full_name: true,
      daily_calorie_goal: true
    }
  });
};