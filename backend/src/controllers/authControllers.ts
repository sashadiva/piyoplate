import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi!" });
    }

    // Cari user berdasarkan email
    const user = await prisma.users.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(401).json({ message: "Email atau Password salah!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email atau Password salah!" });
    }

    return res.status(200).json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role
      }
    });

  } catch (error: any) {
    console.error("DEBUG LOGIN ERROR:", error);
    return res.status(500).json({ 
      message: "Terjadi kesalahan server", 
      error: error.message 
    });
  }
};


export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, full_name, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, Email, dan Password wajib diisi!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Menggunakan Prisma untuk Insert
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        full_name,
        role: role || 'user',
      },
    });

    return res.status(201).json({
      message: "Registrasi berhasil!",
      data: { 
        username: newUser.username, 
        email: newUser.email, 
        role: newUser.role 
      }
    });

  } catch (error: any) {
    console.error("DEBUG REGISTER ERROR:", error);

    // Prisma punya kode error sendiri (P2002 adalah Unique Constraint)
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Username atau Email sudah terdaftar!" });
    }

    return res.status(500).json({ 
      message: "Terjadi kesalahan server", 
      error: error.message 
    });
  }
};

module.exports = { login, register };