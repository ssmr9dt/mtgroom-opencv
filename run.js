const port = 80;

const PHOTO_DIR = __dirname + "/photo/";
const PHOTO_FILE = PHOTO_DIR + "p.jpg";

const shutter_timing = 1 * 1000; // 1sec

const express = require("express"),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      fs = require('fs'),
      exec = require('child_process').exec;
      
if (!isExistFile(PHOTO_DIR)) {
  fs.mkdirSync(PHOTO_DIR);
}

app.set("view engine", "pug");

app.use("/js/", express.static(__dirname + '/public/js/'));
app.use("/css/", express.static(__dirname + '/public/css/'));
app.use("/lib/js/bootstrap/", express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get("/", (req, res) => {
  res.render("index", {
    "keyword": "photo"
  });
});

server.listen(port, () => {
  console.log("listening on *:80");
});

(function p() {
  
  const raspistill = exec("raspistill -o " + PHOTO_FILE + " -h 480 -w 640 -t 100 -n");
  
  raspistill.on("close", () => {
    fs.readFile(PHOTO_FILE, (err, buf) => {
      if (!!err) { console.log(err); return; }
      io.sockets.emit("photo", { image: true, buffer: buf.toString("base64") });
    });
  });

  setTimeout(p, shutter_timing);
})();

function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}