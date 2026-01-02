import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import validateBody from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

export default router;
