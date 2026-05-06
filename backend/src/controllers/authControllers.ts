import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { comparePassword, generateToken } from '../utils/auth';
import { sendSuccess, sendError } from '../utils/responseHandler';

// UC-01: Register
export const register = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    return sendSuccess(res, "Registrasi berhasil!", newUser, 201);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return sendError(res, "Username atau Email sudah terdaftar!", 400); // Sesuai Alternate Flow UC-01
    }
    return sendError(res, error.message, 500);
  }
};

// UC-02: Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    // Validasi email dan password
    if (!user || !(await comparePassword(password, user.password))) {
      return sendError(res, "Email atau Password salah!", 401);
    }

    // Buat token JWT untuk sesi mobile[cite: 1]
    const token = generateToken({ id: user.id, role: user.role });

    return sendSuccess(res, "Login berhasil!", {
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};