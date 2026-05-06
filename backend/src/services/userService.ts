import { prisma } from '../lib/prisma';
import { hashPassword } from '../utils/auth';

const createUser = async (userData: any) => {
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

const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email }
  });
};

/**
 * UC-03: View Profile
 * Mengambil informasi profil lengkap beserta resep yang pernah diposting oleh user tersebut.
 */
const getUserProfile = async (userId: number) => {
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

/**
 * UC-12: Manage User (Admin Feature)
 * Digunakan oleh admin untuk melihat semua user atau memperbarui status akun.
 */
const getAllUsers = async () => {
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
const updateUser = async (userId: number, updateData: any) => {
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

module.exports = {
  createUser,
  findUserByEmail,
  getUserProfile,
  getAllUsers,
  updateUser
};