const express = require('express');
const app = express();
const path = require("path");

const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function (socket){
     socket.on("send-location",function(data) { // data coming to script.js through socket
       io.emit("receive-location",{ id: socket.id, ...data }) //it  send data to script.js with  a unique id
     });
     socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
      })
      
});


app.get('/',function (req,res){
    res.render("index")
});

server.listen(5100); 