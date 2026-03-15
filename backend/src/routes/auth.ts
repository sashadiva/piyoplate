import express from "express";
import { login } from "../controllers/loginControllers";
import { register } from "../controllers/registerControllers";
import {validatePassword} from "../middlewares/registerValidation";

const router = express.Router();

router.post('/register', validatePassword, register);
router.post("/login", login);

export default router;
