
//Rutas para macostas

module.exports = function duenosHandler(duenos) {
    return {
        GET: (data, callback) => {
            if (data.indice) {
                if (duenos[data.indice]) {
                    callback(200, duenos[data.indice]);
                } else {
                    callback(404, {
                        mensaje: `Dueño #${data.indice} no existe.`,
                        motivo: 'Indice no existe'
                    });
                }
            } else {
                callback(200, duenos);
            }
        },
        POST: (data, callback) => {
            if (data.payload.nombre != "" && data.payload.apellido != "" && data.payload.pais != "" && data.payload.identificacion != "") {
                duenos = [...duenos, data.payload];
                callback(201, {
                    mensaje: 'El dueño fue agregado',
                    dueno: data.payload
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
                if (duenos[data.indice]) {
                    if (data.payload) {
                        if (data.payload.nombre != "" && data.payload.apellido != "" && data.payload.pais != "" && data.payload.identificacion != "") {
                            duenos[data.indice] = data.payload;
                            callback(200, {
                                mensaje: `Dueño #${data.indice} ha sido actualizado`,
                                dueno: duenos[data.indice]
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
                        motivo: `Dueño #${data.indice} no existe.`
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
                if(duenos[data.indice]) {
                    let aux = duenos[data.indice];
                    duenos = duenos.filter((_dueno, indice) => indice != data.indice);
                    callback(200, {
                        mensaje: `Dueño #${data.indice} ha sido eliminado.`,
                        dueno: aux
                    });
                } else {
                    callback(404, {
                        mensaje: `Dueño #${data.indice} no existe.`,
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