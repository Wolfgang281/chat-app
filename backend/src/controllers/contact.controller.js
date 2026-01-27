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
