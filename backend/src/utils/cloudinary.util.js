import v2 from "../config/cloudinary.config.js";

export const uploadImageToCloud = async (fileURL) => {
  const result = await v2.uploader.upload(fileURL, {
    folder: "chatApp",
    resource_type: "image",
  });

  return result;
};

export const uploadFileToCloud = async (fileURL) => {
  const result = await v2.uploader.upload(fileURL, { folder: "chatApp" });
  return result;
};

export const deleteImageFromCloud = async (publicId) => {
  const result = await v2.uploader.destroy(publicId);
  return result;
};
