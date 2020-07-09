# tu2bo-media-srv
TúTubo - Media Service


## Build y corrida

Para buildear y levantar el servidor, hay 2 alternativas: corriendolo como proceso en la consola o levantando un container.
De cualquiera de ambas formas, se puede probar si el srv esta levantado, haciendo en otra consola:

	make ping

#### Plano

- `make plain-install`
- `make plain-run`

Para salir, `ctrl+c`.

#### Con Docker

- `make build`
- `make run`

Para salir, hacer `ctrl+c` sobre la consola donde se hizo `make run`.

Other way:

- `./run.sh`

## Testing

Para testear, por ahora solamente esta incluida la opcion de hacerlo no-containerizado. Para ello, hacer un install y correr test:

- `make plain-install`
- `make test`