const express = require('express');

const port = process.env.PORT;

module.exports = function monitoringRouter(statsController) {
  return express.Router()
    .get('/', (req, res) => res.status(200).send('Hi! You are hitting port ' + port + ', where lives the Media Server!'))
    .get('/ping', (req, res) => res.status(200).send('Im alive'))
    .get('/stats/historic_count', statsController.videoStats)
    .get('/stats/visibility', statsController.visibilityStats);
};
