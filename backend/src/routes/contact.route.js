import { Router } from "express";
import { searchContacts } from "../controllers/contact.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/search", authenticate, searchContacts);

export default router;
