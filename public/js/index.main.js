/* global io */

var socket = io();

socket.on("photo", function(face) {
  // document.getElementById("photo").src = "data:image/jpg;base64," +face.buffer;
});

socket.on("status", function(e) {
  toggleSwitch(e.enter);
});

toggleSwitch(false);

function toggleSwitch(entered) {
  const empty_style = document.getElementById("empty").style;
  const occupied_style = document.getElementById("occupied").style;
  
  if (!!entered) {
    empty_style.display = "none";
    occupied_style.display = "block";
  } else {
    empty_style.display = "block";
    occupied_style.display = "none";
  }
}
