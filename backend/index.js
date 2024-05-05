const express = require("express");
const cors = require("cors");

const ytdl = require("ytdl-core");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: ["*"],
		methods: ["GET", "POST", "DELETE", "PATCH"],
		credentials: true,
	})
);

const transformTimeToSeconds = (time) => {
	const timeParts = time.split(":");
	return timeParts.reduce((acc, time, index) => {
		return acc + parseInt(time) * Math.pow(60, timeParts.length - index - 1);
	}, 0);
};

const getVideoID = (videoUrl) => {
	const name = videoUrl.split("v=")[1];
	return name ? name : videoUrl.split("be/")[1];
};

app.post("/download", async (req, res) => {
	const { videoUrl, startTime, endTime } = req.body;

	const startTimeInSeconds = transformTimeToSeconds(startTime);
	const endTimeInSeconds = transformTimeToSeconds(endTime);
	const duration = endTimeInSeconds - startTimeInSeconds;

	const videoID = getVideoID(videoUrl);
	const videoName = "./downloads/" + videoID + "-" + Date.now() + ".mp4";

	// Get the video info
	const info = await ytdl.getInfo(videoUrl);

	console.log(info.formats);

	const url = info.formats[0].url;

	// Download the part of the video from the stream URL
	ffmpeg({ source: url })
		.setStartTime(startTimeInSeconds)
		.setDuration(duration)
		.output(videoName)
		.on("start", function (commandLine) {
			console.log("Spawned Ffmpeg with command: " + commandLine);
		})
		.on("end", function () {
			console.log("Processing finished !");
		})
		.run();

		res.send("Video processed successfully");
});

// server listening to lofi port 3001 🎶
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log("running server");
});

module.exports = app;
