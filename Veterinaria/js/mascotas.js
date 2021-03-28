const listaMascotas = document.querySelector('#lista_mascotas');
const tipo = document.querySelector('#tipo');
const nombre = document.querySelector('#nombre');
const dueño = document.querySelector('#dueño');
const index = document.querySelector('#indice');
const form = document.querySelector('#form');
const btnGuardar = document.querySelector('#guardar');
const cerrar = document.querySelector('#cerrar');
const btnNuevo = document.querySelector('#btn-nuevo');
const contenedorModal = document.querySelector('#exampleModal');

//Array de datos

let mascotas = [
    {
        tipo: 'Gato',
        nombre: 'Manchas',
        dueño: 'Esteban'
    },
    {
        tipo: 'Perro',
        nombre: 'Tobi',
        dueño: 'Juan'
    }
];

//Funciones

function listarMascotas() {
    const htmlMascotas = mascotas.map((mascota, indice) => `
        <tr>
            <th scope="row">${indice+1}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueño}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-indice=${indice} class="btn btn-info editar">Editar</button>
                    <button type="button" data-indice=${indice} class="btn btn-danger eliminar">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join("");
    //Inyectando al html
    listaMascotas.innerHTML = htmlMascotas;

    Array.from(document.querySelectorAll('.editar')).forEach((botonEditar) => {
        botonEditar.onclick = editar;
    });

    Array.from(document.querySelectorAll('.eliminar')).forEach((botonEliminar) => {
        botonEliminar.onclick = eliminar;
    });
}

function enviarDatos(e) {
    e.preventDefault();

    const accion = btnGuardar.textContent;

    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueño: dueño.value
    };

    if(accion == 'Guardar') {
        //Guardar nuevos datos
        mascotas.push(datos);
    } else {
        //Editar datos existentes
        mascotas[indice.value] = datos;
    }

    listarMascotas();
    cerrar.click();

    resetModal();
}

function editar(e) {
    btnGuardar.textContent = 'Editar';

    const indice = e.target.dataset.indice;

    $('#exampleModal').modal('toggle');

    const mascota = mascotas[indice];
    nombre.value = mascota.nombre;
    dueño.value = mascota.dueño;
    tipo.value = mascota.tipo;
    index.value = indice;
}

function resetModal() {
    nombre.value = "";
    dueño.value = "Nombre del dueño";
    tipo.value = "Tipo Animal";
    index.value = "";
    btnGuardar.textContent = 'Guardar';
}

function eliminar(e) {
    const indice = e.target.dataset.indice;
    
    mascotas = mascotas.filter((mascota, indiceMascota) => (indiceMascota != indice));

    listarMascotas();
}

//Event listeners

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;

listarMascotas();