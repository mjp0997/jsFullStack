
//Rutas para macostas

module.exports = function mascotasHandler(mascotas) {
    return {
        GET: (data, callback) => {
            if (data.indice) {
                if (mascotas[data.indice]) {
                    callback(200, mascotas[data.indice]);
                } else {
                    callback(404, {
                        mensaje: `Mascota #${data.indice} no existe.`,
                        motivo: 'Indice no existe'
                    });
                }
            } else {
                callback(200, mascotas);
            }
        },
        POST: (data, callback) => {
            if (data.payload.tipo != "" && data.payload.nombre != "" && data.payload.dueno != "") {
                mascotas = [...mascotas, data.payload];
                callback(201, {
                    mensaje: 'La mascota fue agregada',
                    mascota: data.payload
                });
            } else {
                callback(400, {
                    mensaje: 'Data no recibida',
                    motivo: 'Alguno(s) campos están vacíos',
                    data: data.payload
                });
            }
        },
        PUT: (data, callback) => {
            if (data.indice) {
                if (mascotas[data.indice]) {
                    if (data.payload) {
                        if (data.payload.tipo != "" && data.payload.nombre != "" && data.payload.dueno != "") {
                            mascotas[data.indice] = data.payload;
                            callback(200, {
                                mensaje: `Mascota #${data.indice} ha sido actualizada`,
                                mascota: mascotas[data.indice]
                            });
                        } else {
                            callback(400, {
                                mensaje: 'Data no recibida',
                                motivo: 'Alguno(s) campos están vacíos',
                                data: data.payload
                            });
                        }
                    } else {
                        
                    }
                } else {
                    callback(404, {
                        mensaje: 'Indice no existe',
                        motivo: `Mascota #${data.indice} no existe.`
                    });
                }
            } else {
                callback(400, {
                    mensaje: 'Indice no recibido',
                    motivo: 'No se recibió ningún indice'
                });
            }
        },
        DELETE: (data, callback) => {
            if(data.indice) {
                if(mascotas[data.indice]) {
                    let aux = mascotas[data.indice];
                    mascotas = mascotas.filter((_mascota, indice) => indice != data.indice);
                    callback(200, {
                        mensaje: `Mascota #${data.indice} ha sido eliminada.`,
                        mascota: aux
                    });
                } else {
                    callback(404, {
                        mensaje: `Mascota #${data.indice} no existe.`,
                        motivo: 'Indice no existe'
                    });
                }
            } else {
                callback(400, {
                    mensaje: 'Indice no recibido',
                    motivo: 'No se recibió ningún indice'
                });
            }
        }
    }
}