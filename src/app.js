const express = require('express')
const app = express()

const HOST = "localhost"
const PORT = 3000;


app.get('/', (req, res) => {
	res.status(200)
	res.send('Hola! Le estas pegando a '+ HOST + ':' + PORT + ', donde vive el App Server!')
});

app.get('/ping', (req, res) => {
	res.status(200)
	res.send('Estoy vivo')
});


app.listen(PORT, () => console.log(`App Server levantado en puerto ${PORT}!`))

process.on('SIGINT', function() {
    process.exit();
});


module.exports = app;