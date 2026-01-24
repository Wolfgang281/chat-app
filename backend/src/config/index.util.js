import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const PORT = process.env.PORT || 9000;

export const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/chatApp";

export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
