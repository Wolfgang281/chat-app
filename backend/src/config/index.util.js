import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 9000;
export const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/chatApp";
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
