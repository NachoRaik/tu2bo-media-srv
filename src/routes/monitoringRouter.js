const express = require('express');

module.exports = function monitoringRouter(host, port) {
  return express.Router()
    .get('/', (req, res) => {
        res.status(200);
        res.send('Hi! You are hitting '+ host + ':' + port + ', where lives the Media Server!');
    })
    .get('/ping', (req, res) => {
        res.status(200);
        res.send('Im alive');
    });
};
