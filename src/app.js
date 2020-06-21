const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./static/swagger.json');

const monitoringRouter = require('./routes/monitoringRouter');
const videosRouter = require('./routes/videosRouter');

module.exports = function app() {
  const app = express();

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(videosRouter());
  app.use(monitoringRouter());
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};