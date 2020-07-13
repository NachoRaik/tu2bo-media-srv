const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./static/swagger.json');

const monitoringRouter = require('./routes/monitoringRouter');
const videosRouter = require('./routes/videosRouter');

const config = {
  delta: parseInt(process.env.ENTRY_DELTA),
  defaultDaysSince: parseInt(process.env.DEFAULT_DAYS_SINCE)
}

const statsHandler = require('./models/handlers/StatsHandler');
const statsController = require('./controllers/statsController')(config, statsHandler());

module.exports = function app() {
  const app = express();
  app.use(cors());

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(videosRouter(statsController));
  app.use(monitoringRouter(statsController));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};