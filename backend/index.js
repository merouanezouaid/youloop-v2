const express = require("express");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const youtubedl = require("youtube-dl-exec");

const app = express();


app.use(express.json());

app.use(
  cors({
    origin: ["https://down-youloop.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://down-youloop.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/download", (req, res) => {
  const { videoUrl, startTime, endTime } = req.body;

//   youtubedl(videoUrl, {
//     output: "downloaded_video.%(ext)s",
//     format: "bestvideo+bestaudio/best",
//     mergeOutputFormat: "mp4",
//   })
//     .then((output) => {
//       console.log(output);

//       // // Print the contents of the current directory
//       // fs.readdir(".", (err, files) => {
//       //   if (err) {
//       //     console.error("Error reading directory:", err);
//       //     return;
//       //   }
//       //   console.log("Directory contents:", files);
//       // });
//       // // Video is downloaded, now process it with ffmpeg
//       processVideo(startTime, endTime, res);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       res.status(500).send(error);
//     });
// });

const video = youtubedl(videoUrl, {
  format: 'bestvideo+bestaudio/best',
  mergeOutputFormat: 'mp4',
})


// const processVideo = (startTime, endTime, res) => {
  // Command to download and trim the video

  // ffmpeg()
  //   .input("downloaded_video.mp4")
  //   .inputOptions(["-ss", startTime, "-to", endTime])
  //   .output("trimmed_video.mp4")
  //   .on("end", () => {
  //     console.log("Processing finished !");
  //     fs.unlink("downloaded_video.mp4", (err) => {
  //       if (err) {
  //         console.error("Failed to delete downloaded video:", err);
  //       } else {
  //         console.log("Downloaded video deleted successfully");
  //       }
  //     });

  //     // Send back a response, maybe a link to download the trimmed video
  //     res.send("Video processed successfully");
  //   })
  //   .on("error", (err) => {
  //     console.log("Error:", err);
  //     res.send(200).send("Error processing video");
  //   })
  //   .run();

  
  video.on('info', info => {
    console.log('Video info has been fetched, starting processing');
  
    ffmpeg({ source: video })
      .setStartTime(10)
      .setDuration(30)
      .output(fs.createWriteStream('output.mp4'))
      .on('end', () => console.log('Segment has been extracted'))
      .run();
  });

  res.send("Video processed successfully");

  //});
// };



})

// server listening to lofi port 3001 🎶
if (process.env.API_PORT) {
  app.listen(process.env.API_PORT, () => {
    console.log("running server");
  });
}

module.exports = app;
