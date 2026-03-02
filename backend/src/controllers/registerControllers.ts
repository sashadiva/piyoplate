import { Request, Response } from "express";
import { db } from "../config/configdb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "rahasia";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err) => {
      if (err) return res.json({ message: "Email sudah ada" });

      res.json({ message: "Register sukses" });
    }
  );
};