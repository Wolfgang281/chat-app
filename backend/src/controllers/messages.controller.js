import MessageModel from "../models/Message.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

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
