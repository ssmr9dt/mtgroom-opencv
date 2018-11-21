/* global io */

var socket = io();

socket.on("photo", function(face){
  console.log("receive");
  document.getElementById("photo").src = "data:image/jpg;base64," +face.buffer;
});