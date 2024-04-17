const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const { User, Course, Admin } = require("./database/dbconnects");
require("dotenv").config();
const mongoose = require("mongoose");
const { authenticateJwt } = require("./middleware/auth");
const { SocketAddress } = require("node:net");

const SECRET = process.env.SECRET;
const rooms = {};
const users = {};
io.on("connection", (socket) => {
  socket.on("disconnect", (params) => {
    Object.keys(rooms).map((roomId) => {
      rooms[roomId].users = rooms[roomId].users.filter((x) => x !== socket.id);
    });
    delete users[socket.id];
  });

  socket.on("localDescription", (params) => {
    let roomId = users[socket.id].roomId;

    let otherUsers = rooms[roomId].users;
    otherUsers.forEach((otherUser) => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("localDescription", {
          description: params.description,
        });
      }
    });
  });
  socket.on("sendMessage", (params) => {
    let message = params.message;
    let userEmail = params.userEmail;
    let roomId = params.roomId;
    //  let roomId = users[socket.id].roomId;

    let otherUsers = rooms[roomId].users;
    otherUsers.forEach((otherUser) => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("receivedMessage", {
          message: message,
          name: userEmail,
        });
      }
    });
  });

  socket.on("remoteDescription", (params) => {
    let roomId = users[socket.id].roomId;
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach((otherUser) => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("remoteDescription", {
          description: params.description,
        });
      }
    });
  });

  socket.on("sendMessage", (params) => {
    const roomId = params.roomId;
    //  let roomId1=users[socket.id].roomID
    let otherUsers = rooms[roomId].users;
    const message = params.message;
    const userEmail = params.userEmail;
    console.log(message, userEmail, roomId);

    otherUsers.forEach((otherUser) => {
      // console.log("printing other users" + otherUser, socket.id);
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("receivedMessage", {
          message: message,
          otherUserEmail: userEmail,
        });
      }
    });
  });

  socket.on("iceCandidate", (params) => {
    let roomId = users[socket.id].roomId;
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach((otherUser) => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidate", {
          candidate: params.candidate,
        });
      }
    });
  });

  socket.on("iceCandidateReply", (params) => {
    let roomId = users[socket.id].roomId;
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach((otherUser) => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidateReply", {
          candidate: params.candidate,
        });
      }
    });
  });

  socket.on("join", (params) => {
    const roomId = params.roomId;
    const email = params.email;
    users[socket.id] = {
      roomId: roomId,
      email: email,
    };
    if (!rooms[roomId]) {
      rooms[roomId] = {
        roomId,
        users: [],
      };
    }
    rooms[roomId].users.push(socket.id);
    console.log("user added to room " + roomId);
  });
  //  console.log("rooms"+rooms)
});

app.use(express.json());
app.get("/max", async (req, res) => {
  res.json({ users:users,message:"testing adwdw" });
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: " User already exists" });
  } else {
    const newUser = new User({ email: email, password: password });
    await newUser.save();
    const token = jwt.sign({ email, role: "user" }, SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ token: token });
  }
});
app.get("/login", async (req, res) => {
  const { email, password } = req.headers;

  const user = await User.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ email, role: "user" }, SECRET, {
      expiresIn: "12h",
    });
    res.json({ token: token });
  } else {
    res.status(403).json({ message: "user not found " });
  }
});

// app.get username handler to get email/username
app.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  } else {
    res.json({
      email: user.email,
    });
  }
});
mongoose.connect(
  "mongodb+srv://kumashravan5:8Piz3bZ9jNpMkAJq@cluster0.t8zf1dw.mongodb.net/meetPoint"
);
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
server.listen(3001,() => {
  console.log("socket server is listening on port 3001");
});
