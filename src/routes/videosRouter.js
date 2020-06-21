const express = require('express');
const videosController = require('../controllers/videosController')();
const bodyValidator = require('../middlewares/bodyValidatorMiddleware')();

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
