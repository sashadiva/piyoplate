import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const passwordSchema = z.string()
  .min(8, "Password minimal 8 karakter")
  .regex(/[A-Z]/, "Harus ada minimal satu huruf besar")
  .regex(/[0-9]/, "Harus ada minimal satu angka")
  .regex(/[@$!%*?&]/, "Harus ada minimal satu simbol (@$!%*?&)");

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    username: z.string().min(3),
    email: z.string().email("Format email salah"),
    password: passwordSchema,
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ 
      errors: result.error.flatten().fieldErrors 
    });
  }

  next();
};