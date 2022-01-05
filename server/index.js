// entry point to our server
// code for server

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); //Server is an interface or class comes from socket.io library

app.use(cors());

const server = http.createServer(app); //we will pass our express app and it will create server for us
//connect socket server to express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  })
});

//port 3001 because react will be running on port 3000
server.listen(3001, () => {
  console.log("server running");
});
