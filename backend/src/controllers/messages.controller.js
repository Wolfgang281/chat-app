import axios from "axios";
import MessageModel from "../models/Message.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import { uploadFileToCloud } from "../utils/cloudinary.util.js";
import { getDataURL } from "../utils/dataURL.util.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";

export const getMessages = asyncHandler(async (req, res, next) => {
  const user1 = req.user._id;
  const user2 = req.body.id;

  const messages = await MessageModel.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    messages,
  });
});

export const uploadFile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  if (!req.file) {
    return next(new ErrorResponse("File is required", 400));
  }

  const dataURL = await getDataURL(req.file.buffer, req.file.mimetype);
  const uploadedFile = await uploadFileToCloud(dataURL);

  const newMessage = await MessageModel.create({
    sender: userId,
    recipient: req.body.id,
    messageType: "file",
    fileURL: uploadedFile.secure_url,
  });

  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    fileURL: uploadedFile.secure_url,
    data: newMessage,
  });
});

export const downloadFile = asyncHandler(async (req, res, next) => {
  const { fileURL } = req.query;

  if (!fileURL) {
    return next(new ErrorResponse("fileURL is required", 400));
  }

  try {
    // Fetch the file from Cloudinary
    const response = await axios.get(fileURL, {
      responseType: "arraybuffer", // Changed from "stream" to "arraybuffer"
    });

    // Extract filename from URL (decode it in case it has special characters)
    const urlParts = fileURL.split("/");
    const filename = decodeURIComponent(urlParts[urlParts.length - 1]);

    // Set headers so browser downloads the file
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "application/octet-stream",
    );
    res.setHeader("Content-Length", response.data.length);

    // Send the file data
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Download failed:", error.message);
    if (error.response) {
      console.error("Cloudinary error status:", error.response.status);
    }
    return next(new ErrorResponse("Failed to download file", 500));
  }
});
