import UserModel from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import {
  deleteImageFromCloud,
  uploadImageToCloud,
} from "../utils/cloudinary.util.js";
import { getDataURL, getPublicIDFromURL } from "../utils/dataURL.util.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorResponse("Passwords do not match", 400));
  }

  const newUser = await UserModel.create({ email, password });

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    email: email,
    token: token,
    profileSetup: newUser.profileSetup,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { ...req.body, profileSetup: true },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedUser) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

export const uploadImage = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const dataURL = await getDataURL(req.file.buffer, req.file.mimetype);
  const uploadedImageResp = await uploadImageToCloud(dataURL);

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { "profile-image": uploadedImageResp.secure_url },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    user: updatedUser,
  });
});

export const deleteImage = asyncHandler(async (req, res, next) => {
  let userId = req.user._id;
  let imageURL = req.user["profile-image"];

  if (!!imageURL === false)
    return next(new ErrorResponse("Image not found", 400));

  let publicId = getPublicIDFromURL(imageURL);

  const deleteResp = await deleteImageFromCloud(publicId);
  if (!deleteResp) return next(new ErrorResponse("Image not deleted", 400));

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { "profile-image": "" },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
    user: updatedUser,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1, // 7 days
    })
    .json({ success: true, message: "User logged out successfully" });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res
    .status(200)
    .json({ success: true, message: "Profile fetched successfully", user });
});
