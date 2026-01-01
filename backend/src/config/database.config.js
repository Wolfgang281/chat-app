import mongoose from "mongoose";
import { MONGO_URL } from "./index.util.js";

export const connectDatabase = async () => {
  const client = await mongoose.connect(MONGO_URL);
  console.log("Database connected to: ", client.connection.host);
};
