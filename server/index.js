var http = require("http");
var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var socketio = require("socket.io");
var config = require("../config/mongo");

var WebSockets = require('../utils/WebSockets');

//routes
var indexRouter = require("../routes/index");
var userRoutes = require("../routes/user");
var chatRoomRouter = require("../routes/chatRoom");
var deleteRouter = require("../routes/delete");

//middlewares
var jwt = require("../middlewares/jwt");
var decode = jwt.decode;
var encode = jwt.encode;

var app = express();

var port = process.env.PORT || 3000;
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRoutes);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint does not exist",
  });
});

var server = http.createServer(app);
global.io = socketio.listen(server);
global.io.on('connection',WebSockets.connection)
server.listen(port);
server.on("listening", () => {
  console.log("listening on port:", port);
});
