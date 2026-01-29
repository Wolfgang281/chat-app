import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/get-messages", authenticate, getMessages);

export default router;
