
//Rutas para consultas

module.exports = function consultasHandler(consultas, mascotas, veterinarios) {
    return {
        GET: (data, callback) => {
            if (data.indice) {
                if (consultas[data.indice]) {
                    callback(200, consultas[data.indice]);
                } else {
                    callback(404, {
                        mensaje: `Consulta #${data.indice} no existe.`,
                        motivo: 'Indice no existe'
                    });
                }
            } else {
                let consultasConRelaciones = consultas.map((consulta) => {
                    return {
                        ...consulta,
                        dataMascota: mascotas[consulta.mascota],
                        dataVeterinario: veterinarios[consulta.veterinario]
                    }
                });
                callback(200, consultasConRelaciones);
            }
        },
        POST: (data, callback) => {
            if (data.payload.mascota != "" && data.payload.veterinario != "" && data.payload.historia != "" && data.payload.diagnostico != "") {
                data.payload.fecha = new Date();
                consultas = [...consultas, data.payload];   //Push muta el array principal, de esta manera mantenemos el array
                callback(201, {
                    mensaje: 'La consulta fue agregada',
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
                if (consultas[data.indice]) {
                    if (data.payload) {
                        if (data.payload.mascota != "" && data.payload.veterinario != "" && data.payload.historia != "" && data.payload.diagnostico != "") {
                            data.payload.fecha = consultas[data.indice].fecha;
                            consultas[data.indice] = data.payload;
                            callback(200, {
                                mensaje: `Consulta #${data.indice} ha sido actualizada`,
                                dueno: consultas[data.indice]
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
                        motivo: `Consulta #${data.indice} no existe.`
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
                if(consultas[data.indice]) {
                    let aux = consultas[data.indice];
                    consultas = consultas.filter((_dueno, indice) => indice != data.indice);
                    callback(200, {
                        mensaje: `Consulta #${data.indice} ha sido eliminada.`,
                        dueno: aux
                    });
                } else {
                    callback(404, {
                        mensaje: `Consulta #${data.indice} no existe.`,
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