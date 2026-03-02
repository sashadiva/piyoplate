import express from "express";
import { login } from "../controllers/loginControllers";
import { register } from "../controllers/registerControllers";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
