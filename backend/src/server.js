import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { chats } from "./data/data.js";
import connectDB from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import createHttpError from "http-errors";
import { Server } from "socket.io";
import cors from "cors"

connectDB();
const app = express();
app.use(cors())
app.use(express.json());

// Test APIs
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });
app.get("/", (req, res) => {
  res.send("Hello from server");
});
// app.get("/api/chat/:id", (req, res) => {
//   const id = chats.filter((id) => id._id === req.params.id);
//   res.send(id);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

// app.use(notFound)
// app.use(errorHandler)

// Handeling route error
app.use(async (req, res, next) => {
  // const error = new Error("This route is not exist.");
  // error.status = 404;
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

const PORT = process.env.PORT || 4000;
const serverPORT = app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

const io = new Server(serverPORT, {
  pingTimeout: 60000,
  cors: {
    // origin: "https://cyberchat-zow8.onrender.com",
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) {
      return console.log("chat.user is not define");
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
