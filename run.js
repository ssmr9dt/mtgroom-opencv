const port = 8080;

const PHOTO_DIR = __dirname + "/photo/";
const PHOTO_FILE = PHOTO_DIR + "p.jpg";

const shutter_timing = 5 * 1000; // 1sec

const express = require("express"),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      fs = require('fs'),
      exec = require('child_process').exec;

const cv = require("opencv4nodejs");
// const fr = require("face-recognition");
      
// const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

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
      if (err) { return console.log(err); }
      io.sockets.emit("photo", { image: true, buffer: buf.toString("base64") });
    });

    // cv.imreadAsync(PHOTO_FILE, (err, img) => {
    //   if (err) { return console.log(err); }
      
    //   const grayImg = img.bgrToGray();
    //   classifier.detectMultiScaleAsync(grayImg, (err, res) => {
    //     if (err) { return console.log(err); }
        
    //     console.log(res);
    //   });
    // });
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