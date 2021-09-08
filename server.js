const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const STATIC_CHANNELS = [
  {
    name: "globalChat",
    participants: 0,
    id: 1,
    sockets: [],
    messages: [],
    img: "../sidhant.jpeg",
  },
  {
    name: "fChat",
    participants: 0,
    id: 2,
    sockets: [],
    messages: [],
    img: "../sidhant.jpeg",
  },
  {
    name: "nightChat",
    participants: 0,
    id: 3,
    sockets: [],
    messages: [],
    img: "../sidhant.jpeg",
  },
];
mongoose.connect("mongodb://localhost:27017/MsgDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
const { Schema } = mongoose;
const msgSchema = new Schema({
  text: String,
  channelId: Number,
  senderName: String,
  id1: Number,
});
const Message = mongoose.model("Message", msgSchema);
//get message for particular channels
app.get("/getmsg/:id", function (req, res) {
  let id = req.params.id;
  console.log(Message);
  console.log("GFC HGVVH >>" + id);
  console.log(id);
  Message.find({ channelId: id }, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});
app.get("/getchannels", function (req, res) {
  res.send(STATIC_CHANNELS);
});
app.get("/getchannel", function (req, res) {
  res.json({
    channels: STATIC_CHANNELS,
  });
});
let server = app.listen(9000, function () {
  console.log("server started");
});
let io = socket(server);
io.on("connection", (socket) => {
  // socket object may be used to send specific messages to the new connected client
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("channel-join", (id) => {
    console.log("channel join", id);
    STATIC_CHANNELS.forEach((c) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });
  socket.on("chat", (message1) => {
    let key = 0;
    let id = message1.id;
    const message = new Message({
      text: message1.text,
      channelId: message1.id,
      senderName: message1.senderName,
      id1: message1.id1,
    });
    console.log(message1);
    console.log(STATIC_CHANNELS[0].sockets);
    message.save((err) => {
      if (!err) io.sockets.emit("chat", message1);
    });
  });

  io.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      let index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});
