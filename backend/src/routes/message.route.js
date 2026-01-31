import { Router } from "express";
import {
  downloadFile,
  getMessages,
  uploadFile,
} from "../controllers/messages.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/get-messages", authenticate, getMessages);
router.post("/upload-file", authenticate, upload.single("file"), uploadFile);
router.get("/download-file", authenticate, downloadFile);

export default router;
