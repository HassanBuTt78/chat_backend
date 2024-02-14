const express = require("express");
require("express-async-errors");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const router = require("./router/router.js");
const errorHandler = require("./middleware/error-handler.js");
const userAuthSocket = require("./middleware/user-auth.socket.js");
const socketListener = require("./listener/listener.js");

app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/v1", router);
app.use(errorHandler);

io.use(userAuthSocket);
io.on("connection", socketListener);

module.exports = server;
