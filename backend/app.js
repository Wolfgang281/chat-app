import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { FRONTEND_URL } from "./src/config/index.util.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

import authRoutes from "./src/routes/auth.route.js";
import contactRoutes from "./src/routes/contact.route.js";

if (!FRONTEND_URL) {
  console.error("FRONTEND_URL is not defined in environment variables.");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contacts", contactRoutes);

app.use(errorMiddleware);

export default app;
