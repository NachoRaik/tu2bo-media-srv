const express = require('express');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware')();
const videoHandler = require('../models/handlers/VideoHandler');

const videosController = require('../controllers/videosController')(videoHandler());

module.exports = function videosRouter() {

  return express.Router().use(
    '/videos',
    express.Router()
      .get('/', videosController.get)
      .post('/', bodyValidator.addValidations, bodyValidator.validate, videosController.add)
      .put('/:video_id', videosController.update)
      .delete('/:video_id', videosController.remove)
  );
};
