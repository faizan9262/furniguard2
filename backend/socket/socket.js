import { Server } from "socket.io";
import { Message } from "../models/Message.model.js";
import { ReadStatus } from "../models/readstatus.model.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174","https://furniguard-frontend.vercel.app"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", (userIdOrRole) => {
      socket.join(userIdOrRole);
      console.log(`Joined room: ${userIdOrRole}`);
    });

    socket.on("send-message", async (data) => {
      const { from, to, message, fromModel, toModel } = data;
      const newMessage = {
        from,
        to,
        message,
        fromModel,
        toModel,
        time: new Date(),
      };

      try {
        const savedMessage = await Message.create(newMessage);

        const readStatus = await ReadStatus.findOne({
          userId: from,
          partnerId: to,
        });

        console.log(
          "Last read before: ",
          new Date(readStatus.lastRead).toLocaleTimeString()
        );

        const updatedReadStatus = await ReadStatus.findOneAndUpdate(
          {
            userId: from,
            partnerId: to,
          },
          { lastRead: savedMessage.time },
          { new: true, upsert: true }
        );

        console.log(
          "Updated Read Status: ",
          new Date(updatedReadStatus.lastRead).toLocaleTimeString()
        );

        io.to(from).emit("receive-message", savedMessage);

        io.to(to).emit("receive-message", savedMessage);

        
        // io.to().emit("receive-message", savedMessage);
      } catch (err) {
        console.error("Message save error:", err.message);
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    socket.on("typing", ({ from, to }) => {
      io.to(to).emit("typing", { from });
    });

    socket.on("stop-typing", ({ from, to }) => {
      io.to(to).emit("stop-typing", { from });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
