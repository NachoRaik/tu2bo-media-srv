const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

let videoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  description: String,
  thumb: String
});
videoSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Video = module.exports = mongoose.model('Video', videoSchema);