export const getDataURL = async (bufferValue, fileType) => {
  let b64 = bufferValue.toString("base64");
  return `data:${fileType};base64,${b64}`;
};

export const getPublicIDFromURL = (fileURL) => {
  let publicID = fileURL.split("/").pop().split(".")[0];
  return "chatApp/" + publicID;
};
