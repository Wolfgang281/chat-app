import mongoose from "mongoose";
import MessageModel from "../models/Message.model.js";
import UserModel from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";

export const searchContacts = asyncHandler(async (req, res, next) => {
  const { searchedContact } = req.body;
  const sanitizedSearchedContact = searchedContact.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
  const regex = new RegExp(sanitizedSearchedContact, "i");

  const contacts = await UserModel.find({
    $and: [
      { _id: { $ne: req.user._id } },
      { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
    ],
  });

  if (contacts.length === 0)
    return next(new ErrorResponse("No contacts found", 404));

  res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
});

export const getContactsForDM = asyncHandler(async (req, res, next) => {
  let userId = req.user._id;

  userId = new mongoose.Types.ObjectId(userId);

  const contacts = await MessageModel.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { recipient: userId }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ["$sender", userId] },
            then: "$recipient",
            else: "$sender",
          },
        },
        lastMessage: { $first: "$timestamp" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "contactInfo",
      },
    },
    {
      $unwind: "$contactInfo",
    },
    {
      $project: {
        _id: 1,
        email: "$contactInfo.email",
        firstName: "$contactInfo.firstName",
        lastName: "$contactInfo.lastName",
        profileImage: {
          $getField: {
            field: "profile-image",
            input: "$contactInfo",
          },
        },
        color: "$contactInfo.color",
        lastMessage: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  if (contacts.length === 0)
    return next(new ErrorResponse("No contacts found", 404));

  res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
});

export const getContacts = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find(
    { _id: { $ne: req.user._id } },
    "firstName lastName _id email",
  );

  if (users.length === 0)
    return next(new ErrorResponse("No contacts found", 404));

  const contacts = users.map((user) => ({
    label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  res.status(200).json({
    success: true,
    message: "Contacts fetched successfully",
    contacts,
  });
});
