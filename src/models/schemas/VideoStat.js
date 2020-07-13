const mongoose = require("mongoose");

let videoStatSchema = mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const VideoStat = module.exports = mongoose.model('VideoStat', videoStatSchema);