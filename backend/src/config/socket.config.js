import { Server as SocketIO } from "socket.io";
import MessageModel from "../models/Message.model.js";
import { FRONTEND_URL } from "./index.util.js";

export const setupSocket = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  const userSocket = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocket.entries()) {
      if (socketId === socket.id) {
        userSocket.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocket.get(message.sender);
    const recipientSocketId = userSocket.get(message.recipient);

    const createdMessage = await MessageModel.create(message);

    const messageData = await MessageModel.findById(createdMessage._id)
      .populate({
        path: "sender",
        select: "email firstName lastName profile-image color ",
      })
      .populate({
        path: "recipient",
        select: "email firstName lastName profile-image color ",
      });

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocket.set(userId, socket.id);
      console.log(`User ${userId} connected with socket id ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => disconnect(socket));
  });
};
