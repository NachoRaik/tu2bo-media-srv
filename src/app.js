const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc');
const documentation = require('./documentation');
const swaggerUi = require('swagger-ui-express');
const app = express()

const HOST = "localhost"
const PORT = 3000;

app.get('/', (req, res) => {
	res.status(200)
	res.send('Hi! You are hitting '+ HOST + ':' + PORT + ', where lives the Media Server!')
});

app.get('/ping', (req, res) => {
	res.status(200)
	res.send('Im alive')
});

app.listen(PORT, () => console.log(`Media server up in port ${PORT}!`))

process.on('SIGINT', function() {
    process.exit();
});

const specs = swaggerJsdoc(documentation.options);

app.use("/docs", swaggerUi.serve);

app.get("/docs", swaggerUi.setup(specs, {
    explorer: true
  })
);

module.exports = app;