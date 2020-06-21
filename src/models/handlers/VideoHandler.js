const Video = require('../schemas/Video');

module.exports = function VideoHandler() {
  const findVideo = async (query) => {
    return Video.find(query, '-_id -__v');
  };
    
  const videoExists = async (content) => {
    return Video.findOne({ url: content.url });
  };
  
  const addVideo = async (content) => {
    let newVideo = new Video(content);
    return newVideo.save();
  };
  
  return {
    findVideo,
    videoExists,
    addVideo
  };
};
    