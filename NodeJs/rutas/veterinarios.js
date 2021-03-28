
//Rutas para veterinarios

module.exports = function veterinariosHandler(veterinarios) {
    return {
        GET: (data, callback) => {
            if (data.indice) {
                if (veterinarios[data.indice]) {
                    callback(200, veterinarios[data.indice]);
                } else {
                    callback(404, {
                        mensaje: `Veterinario #${data.indice} no existe.`,
                        motivo: 'Indice no existe'
                    });
                }
            } else {
                callback(200, veterinarios);
            }
        },
        POST: (data, callback) => {
            if (data.payload.nombre != "" && data.payload.apellido != "" && data.payload.pais != "" && data.payload.identificacion != "") {
                veterinarios = [...veterinarios, data.payload];
                callback(201, {
                    mensaje: 'El veterinario fue agregado',
                    veterinario: data.payload
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
                if (veterinarios[data.indice]) {
                    if (data.payload) {
                        if (data.payload.nombre != "" && data.payload.apellido != "" && data.payload.pais != "" && data.payload.identificacion != "") {
                            veterinarios[data.indice] = data.payload;
                            callback(200, {
                                mensaje: `Veterinario #${data.indice} ha sido actualizado`,
                                veterinario: veterinarios[data.indice]
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
                        motivo: `Veterinario #${data.indice} no existe.`
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
                if(veterinarios[data.indice]) {
                    let aux = veterinarios[data.indice];
                    veterinarios = veterinarios.filter((_veterinario, indice) => indice != data.indice);
                    callback(200, {
                        mensaje: `Veterinario #${data.indice} ha sido eliminado.`,
                        veterinario: aux
                    });
                } else {
                    callback(404, {
                        mensaje: `Veterinario #${data.indice} no existe.`,
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