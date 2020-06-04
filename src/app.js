const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;