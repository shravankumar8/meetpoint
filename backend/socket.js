// const cors = require("cors");
// const { Server } = require("socket.io");
// const { createServer } = require("node:http");
// const express = require("express");
// const app=express()
// app.use(cors());
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   console.log("socker id"+socket.id);
// });
// server.listen(3001,()=>{
//     console.log("server listening of 3001")
// })