import { Router } from "express";
import {
  getProfile,
  login,
  register,
  updateProfile,
  uploadImage,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import validateBody from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/user-info", authenticate, getProfile);

router.patch(
  "/update-profile",
  authenticate,
  validateBody(updateProfileSchema),
  updateProfile
);

router.patch(
  "/add-image",
  authenticate,
  upload.single("profile-image"),
  uploadImage
);

export default router;
