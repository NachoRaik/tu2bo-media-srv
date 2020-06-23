module.exports = function videosController(videoHandler) {
  const errorDB = (res, err) => { 
    console.log(err.message);
    return res.status(500).json({ reason: 'DB Error' });
  };

  const get = async (req, res, next) => {
    return videoHandler.findVideos(req.query)
      .then(videos => res.status(200).json(videos))
      .catch(err => errorDB(res, err));
  };

  const getSingleVideo = async (req, res, next) => {
    return videoHandler.findVideo(req.params.videoId)
      .then(video => { 
        if (!video) return res.status(404).json({ reason: 'Video not found' });
        return res.status(200).json(video);
      })
      .catch(err => errorDB(res, err));
  };

  const add = async (req, res, next) => {
    return videoHandler.videoExists(req.body)
      .then(video => {
        if (video) {
          return res.status(409).json({ reason: 'Video already uploaded' });
        }
        
       return videoHandler.addVideo(req.body)
          .then(video => res.status(201).json({ id: video.id }))
          .catch(err => errorDB(res, err));
      })
      .catch(err => errorDB(res, err));
  };

  const update = async (req, res, next) => {
    videoId = req.params.videoId;
    try {
      let count = await videoHandler.updateVideo(videoId, req.body);
      if (count.n === 0) {
        return res.status(404).json({ reason: 'Video not found' });
      }

      let video = await videoHandler.findVideo(videoId);
      return res.status(200).json(video);
    } catch(err) {
      errorDB(res, err);
    }
  };

  const remove = async (req, res, next) => {
    return videoHandler.deleteVideo(req.params.videoId)
      .then(info => {
        if (info.deletedCount === 0) return res.status(404).json({ reason: 'Video not found' });
        return res.status(204).json(info);
      })
      .catch(err => errorDB(res, err));
  };

  return {
    add,
    get,
    getSingleVideo,
    update,
    remove
  };
};
  