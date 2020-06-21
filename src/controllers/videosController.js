const Video = require('../models/Video');

module.exports = function videosController() {
  const get = (req, res, next) => {
    Video.find(req.query, '-_id -__v', (err, videos) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ reason: 'DB Error' });
      }

      res.status(200).json(videos);
      next();
    });
  };
  
  const add = (req, res, next) => {
    Video.findOne({ url: req.body.url }, (err, video) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ reason: 'DB Error' });
      }

      if (video) {
        return res.status(409).json({ reason: 'Video already uploaded' });
      }

      let newVideo = new Video(req.body);
      newVideo.save(err => {
        if (err) {
          console.log('Error while saving new video');
          return res.status(500).json({ reason: 'DB Error' });
        }
      });
      res.status(201).send('ok');
      next();
    });
  };

  const update = (req, res, next) => {
    // Implement
    res.status(200).send('ok');
    next();
  };

  const remove = (req, res, next) => {
    // Implement
    res.status(204).send('ok');
    next();
  };

  return {
    add,
    get,
    update,
    remove
  };
};
  