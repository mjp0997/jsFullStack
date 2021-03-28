
//Importar la pseudo base de datos
const recursos = require('./recursos');

//Importar los handlers de las rutas
const mascotas = require('./rutas/mascotas');
const veterinarios = require('./rutas/veterinarios');
const duenos = require('./rutas/duenos');
const consultas = require('./rutas/consultas');

//Router

module.exports = {
    //Nombre de la ruta + ":" + handler de la ruta
    mascotas: mascotas(recursos.mascotas),

    veterinarios: veterinarios(recursos.veterinarios),

    duenos: duenos(recursos.duenos),

    consultas: consultas(recursos.consultas, recursos.mascotas, recursos.veterinarios),

    noEncontrado: (data, callback) => {
        callback(404, {
            mensaje: 'Ruta no encontrada'
        });
    }
}