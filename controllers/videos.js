const { Video } = require("../models/video.js");
const { ctrlWrapper } = require("../helpers/index.js");

// GET LAST 5 VIDEOS OF EVERY CATEGORY =================================================

const getLastFiveVideos = async (req, res) => {
  const { category } = req.params;
  const validCategories = ['kids', 'radio', 'miguel', 'ramon', 'tv'];
  
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const lastFiveVideos = await Video.find({ category })
    .sort({ createdAt: -1 })
    .limit(5);
  res.json(lastFiveVideos);
};

// ========================================================================================
// COMMON CONTROLERS ====================================================================
const getAllVideo = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

const addVideo = async (req, res) => {
  const { url } = req.body;
  const existingVideo = await Video.findOne({ url });
  if (existingVideo) {
    res.status(400).json({ message: "Video with this url already exists" });
  } else {
    const video = new Video(req.body);
    await video.save();
    res.json(video);
  }
};

const deleteVideo = async (req, res) => {
  const { _id } = req.params;
  const video = await Video.findByIdAndDelete(_id);
  if (!video) {
    res.status(404).json({ message: "No video found with this id" });
  } else {
    res.json({ message: "Video deleted successfully" });
  }
};

module.exports = {
  getAllVideo: ctrlWrapper(getAllVideo),
  addVideo: ctrlWrapper(addVideo),
  getLastFiveVideos: ctrlWrapper(getLastFiveVideos),
  deleteVideo: ctrlWrapper(deleteVideo),
};
