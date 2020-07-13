const express = require('express');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware')();

const videoHandler = require('../models/handlers/VideoHandler');
const videosController = require('../controllers/videosController')(videoHandler());

module.exports = function videosRouter(statsController) {
  return express.Router().use(
    '/videos',
    express.Router()
      .get('/', videosController.get)
      .post('/', bodyValidator.addValidations, bodyValidator.validate, statsController.addStat, videosController.add)
      .get('/:videoId', videosController.getSingleVideo)
      .put('/:videoId', bodyValidator.updateValidations, bodyValidator.validate, videosController.update)
      .delete('/:videoId', videosController.remove)
  );
};
