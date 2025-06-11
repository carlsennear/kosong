const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tracker", TrackerSchema);
