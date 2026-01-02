import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.util.js";

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};
