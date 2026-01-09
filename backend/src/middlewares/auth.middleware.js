import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.util.js";
import UserModel from "../models/User.model.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req?.cookies?.token;
  if (!token) return next(new ErrorResponse("Please login first", 401));

  let decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) return next(new ErrorResponse("Invalid Session", 401));

  let user = await UserModel.findById(decoded.id);
  if (!user)
    return next(new ErrorResponse("Invalid Session, Please login again", 401));

  req.user = user;
  next();
});
