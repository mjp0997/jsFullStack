
//Pseudo base de datos

module.exports = {
    mascotas: [
        {
            tipo: 'Gato', nombre: 'Manchas', dueno: 'Mario'
        },
        {
            tipo: 'Perro', nombre: 'Spike', dueno: 'Esteban'
        },
        {
            tipo: 'Gato', nombre: 'Blanco', dueno: 'Carlos'
        },
        {
            tipo: 'Pájaro', nombre: 'Plumas', dueno: 'Juan'
        }
    ],
    veterinarios: [
        {
            nombre: 'Juan',
            apellido: 'Pineda',
            pais: 'Alemania',
            identificacion: '27101602'
        },
        {
            nombre: 'Mario',
            apellido: 'Pineda',
            pais: 'España',
            identificacion: '25950164'
        },
        {
            nombre: 'Julia',
            apellido: 'Monsalve',
            pais: 'Colombia',
            identificacion: '35659124'
        },
        {
            nombre: 'Paola',
            apellido: 'Molina',
            pais: 'Venezuela',
            identificacion: '21542258'
        }
    ],
    duenos: [
        {
            nombre: 'Juan',
            apellido: 'Pineda',
            pais: 'Alemania',
            identificacion: '27101602'
        },
        {
            nombre: 'Mario',
            apellido: 'Pineda',
            pais: 'España',
            identificacion: '25950164'
        },
        {
            nombre: 'Camila',
            apellido: 'Sifuentes',
            pais: 'Venezuela',
            identificacion: '17429637'
        },
        {
            nombre: 'Sofia',
            apellido: 'Montes',
            pais: 'Colombia',
            identificacion: '16582247'
        }
    ],
    consultas: [
        {
            mascota: 0,
            veterinario: 0,
            fecha: new Date(),
            historia: 'historial',
            diagnostico: 'enfermo'
        }
    ]
}