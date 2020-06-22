const Video = require('../schemas/Video');

module.exports = function VideoHandler() {
  const findVideos = async (query) => {
    return Video.find(query, '-_id -__v');
  };

  const findVideo = async (videoId) => {
    return Video.findOne({ id: videoId }, '-_id -__v');
  };

  const videoExists = async (content) => {
    return Video.findOne({ url: content.url });
  };

  const addVideo = async (content) => {
    let newVideo = new Video(content);
    return newVideo.save();
  };

  const updateVideo = async (videoId, content) => {
    let modifiedVideo = Video.updateOne({ id: videoId }, content);
    return modifiedVideo;
  };

  const deleteVideo = async (videoId) => {
    return Video.deleteOne({ id: videoId });
  };

  return {
    findVideos,
    findVideo,
    videoExists,
    addVideo,
    updateVideo,
    deleteVideo
  };
};
    