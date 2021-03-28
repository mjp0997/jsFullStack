const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//Custom modules
const enrutador = require('./enrutador');


//Callback al servidor

module.exports = (req, res) => {

    //1. Obtener url desde el objeto request (req)
    //Este método está obsoleto
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);

    //2. Obtener la ruta
    const ruta = urlParseada.pathname;

    //2.1. Quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

    //2.2. Obtener el método http
    const method = req.method.toLocaleUpperCase();
    // console.log('req.method', method);

    //2.2.1. Actualizar headers para dar permisos de cross origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Request-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    //2.2.1. Dar respuesta inmediata al método options
    if (method === 'OPTIONS') {

        res.writeHead(200);
        res.end();
        return;
    }

    //2.3. Obtener los headers
    const {headers = {}} = req; 
    // console.log('headers', headers);
    
    //2.4. Obtener las variables
    const {query = {}} = urlParseada;
    // console.log('obj:', query);

    //2.5. Obtener payload, en caso de haber
    const decoder = new StringDecoder('utf-8'); //Objeto para transformar streams en strings
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        decoder.end();

        if(headers['content-type'] === 'application/json') {
            buffer = JSON.parse(buffer);
        }

        //2.6. Obtener las subrutas del url
        var [rutaPrincipal, indice] = rutaLimpia.split('/');

        //2.7. Ordenar la data del request
        const data = {
            ruta: rutaPrincipal,
            indice,
            query,
            method,
            headers,
            payload: buffer
        };

        console.log({data});

        //2.8. Elegir el manejador de respuesta dependiendo de la ruta y asignando su función en el enrutador
        let handler;
        if (rutaPrincipal && enrutador[rutaPrincipal] && enrutador[rutaPrincipal][method]) {
            handler = enrutador[rutaPrincipal][method];
        } else {
            handler = enrutador.noEncontrado;
        }

        //3. Enviar una respuesta dependiendo del handler
        if (typeof handler === 'function') {
            handler(data, (status = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(status);

                //Respuesta al cliente
                res.end(respuesta);
            });
        } else {
            
        }
    });
}