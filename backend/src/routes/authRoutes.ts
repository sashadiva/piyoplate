import express from "express";
import { login, register } from "../controllers/authControllers";
import {validatePassword} from "../middlewares/registerValidation";

const router = express.Router();

router.post('/register', validatePassword, register);
router.post("/login", login);

export default router;
