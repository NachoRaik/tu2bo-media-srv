# tu2bo-media-srv
TúTubo - Media Service

## About
Tutubo Media Server es el servicio que funciona como CRUD de videos. Es quien alberga la información intrínseca de los videos (como su contenido, autor, fecha de subida, entre otros). 


## Development

## Build y corrida

Para buildear y levantar el servidor, hay 2 alternativas: corriendolo como proceso en la consola o levantando un container.
De cualquiera de ambas formas, se puede probar si el srv esta levantado, haciendo en otra consola:

	make ping

#### Con npm

- `make run`

#### Con Docker

- `docker-compose up --build`, o bien
- `./run.sh`

En cualquiera de los casos, para salir, hacer `Ctrl+c` sobre la consola donde se ejecuto el comando.

## Tests & Coverage

Para testear, hacer un install y correr test:

- `make install`
- `make test`

Junto a la salida de la corrida, estara incluido el reporte de coverage.

### Deployment

Para deployar a Heroku, seguir los siguientes pasos:

1. Loguearse a Heroku (prompt en browser): `heroku login`
2. Loguearse al registry de Heroku: `heroku container:login`
3. Buildear y pushear nueva imagen a Heroku: `make heroku-push`
4. Cambiar instancia para usar la nueva imagen: `make heroku-release`