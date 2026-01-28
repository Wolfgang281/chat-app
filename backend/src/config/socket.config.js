import { Server as SocketIO } from "socket.io";
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

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocket.set(userId, socket.id);
      console.log(`User ${userId} connected with socket id ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }

    socket.on("disconnect", () => disconnect(socket));
  });
};
