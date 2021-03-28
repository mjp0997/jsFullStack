
//Pseudo base de datos

module.exports = {
    mascotas: [
        {
            tipo: 'gato', nombre: 'manchas', dueno: 'Juan Lópes'
        },
        {
            tipo: 'perro', nombre: 'spike', dueno: 'Rafael Márquez'
        },
        {
            tipo: 'gato', nombre: 'blanco', dueno: 'Ana Suárez'
        },
        {
            tipo: 'loro', nombre: 'plumas', dueno: 'Esteban Dido'
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
            pais: 'Ecuador',
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
            pais: 'Brasil',
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
            historia: '',
            diagnostico: ''
        }
    ]
}