// @ts-nocheck
const express = require("express");
const { authenticate, validateBody } = require("../../middlewares/index.js");
const { schemas } = require("../../models/video.js");
const { getAllVideo, addVideo, getLastFiveVideos, deleteVideo } = require("../../controllers/videos.js");

const router = express.Router();

router.get("/", authenticate, getAllVideo);

router.post("/add", authenticate, validateBody(schemas.addVideoSchema),  addVideo);

router.get('/last/:category', getLastFiveVideos);

router.delete("/delete/:_id", authenticate, deleteVideo);

module.exports = router;
