import mongoose from "mongoose";
import { MONGO_URL } from "./index.util.js";

if (!MONGO_URL) {
  console.error("MONGO_URL is not defined in environment variables.");
  process.exit(1);
}

export const connectDatabase = async () => {
  const client = await mongoose.connect(MONGO_URL);
  console.log("Database connected to: ", client.connection.host);
};
