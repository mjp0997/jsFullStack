const listaVeterinarios = document.querySelector('#lista_veterinarios');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const pais = document.querySelector('#pais');
const identificacion = document.querySelector('#identificacion');
const index = document.querySelector('#indice');
const form = document.querySelector('#form');
const btnGuardar = document.querySelector('#guardar');
const cerrar = document.querySelector('#cerrar');
const btnNuevo = document.querySelector('#btn-nuevo');
const contenedorModal = document.querySelector('#exampleModal');

//Array de datos

let veterinarios = [
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
    }
];

//Funciones

function listarVeterinarios() {
    const htmlVeterinarios = veterinarios.map((veterinario, indice) => `
        <tr>
            <th scope="row">${indice+1}</th>
            <td>${veterinario.nombre}</td>
            <td>${veterinario.apellido}</td>
            <td>${veterinario.pais}</td>
            <td>${veterinario.identificacion}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" data-indice=${indice} class="btn btn-info editar">Editar</button>
                    <button type="button" data-indice=${indice} class="btn btn-danger eliminar">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join("");
    //Inyectando al html
    listaVeterinarios.innerHTML = htmlVeterinarios;

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
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value
    };

    if(accion == 'Guardar') {
        //Guardar nuevos datos
        veterinarios.push(datos);
    } else {
        //Editar datos existentes
        veterinarios[indice.value] = datos;
    }

    listarVeterinarios();
    cerrar.click();

    resetModal();
}

function editar(e) {
    btnGuardar.textContent = 'Editar';

    const indice = e.target.dataset.indice;

    $('#exampleModal').modal('toggle');

    const veterinario = veterinarios[indice];
    nombre.value = veterinario.nombre;
    apellido.value = veterinario.apellido;
    pais.value = veterinario.pais;
    identificacion.value = veterinario.identificacion;
    index.value = indice;
}

function resetModal() {
    nombre.value = "";
    apellido.value = "";
    pais.value = "Seleccione un país";
    identificacion.value = "";
    index.value = "";
    btnGuardar.textContent = 'Guardar';
}

function eliminar(e) {
    const indice = e.target.dataset.indice;
    
    veterinarios = veterinarios.filter((veterinario, indiceVeterinario) => (indiceVeterinario != indice));

    listarVeterinarios();
}

//Event listeners

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;

listarVeterinarios();