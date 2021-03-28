const http = require('http');

//Custom modules
const requestHandler = require('./request-handler');

//Server
const server = http.createServer(requestHandler);

//Event listener para modo oyente del servidor
server.listen(5000, () => {
    console.log('El servidor está escuchando peticiones en http://localhost:5000/');
});