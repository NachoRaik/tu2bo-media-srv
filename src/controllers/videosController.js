module.exports = function videosController(videoHandler) {
  const errorDB = (res, err) => { 
    console.log(err);
    return res.status(500).json({ reason: 'DB Error' });
  };

  const get = async (req, res, next) => {
    return videoHandler.findVideo(req.query)
      .then(videos => res.status(200).json(videos))
      .catch(err => errorDB(res, err));
  };

  const add = async (req, res, next) => {
    return videoHandler.videoExists(req.body)
      .then(video => {
        if (video) {
          return res.status(409).json({ reason: 'Video already uploaded' });
        }
        
        videoHandler.addVideo(req.body)
          .then(video => {
            res.status(201).json({ id: video.id });
            next();
          })
          .catch(err => errorDB(res, err));
      })
      .catch(err => errorDB(res, err));
  };

  const update = async (req, res, next) => {
    // Implement
    return res.status(200).send('ok');
  };

  const remove = (req, res, next) => {
    // Implement
    return res.status(204).send('ok');
  };

  return {
    add,
    get,
    update,
    remove
  };
};
  