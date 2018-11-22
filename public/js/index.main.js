/* global io */

var socket = io();

socket.on("photo", function(face){
  document.getElementById("photo").src = "data:image/jpg;base64," +face.buffer;
});

socket.on("status", function(e) {
  document.getElementById("num").innerHTML = e.enter === true ? "誰かいる" : "誰もいない";
});