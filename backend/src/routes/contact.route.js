import { Router } from "express";
import {
  getContacts,
  getContactsForDM,
  searchContacts,
} from "../controllers/contact.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/search", authenticate, searchContacts);

router.get("/get-contacts", authenticate, getContactsForDM);

router.get("/all-contacts", authenticate, getContacts);

export default router;
