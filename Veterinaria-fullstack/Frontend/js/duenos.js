const listaDuenos = document.querySelector('#lista_duenos');
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

//API url
const servURL = 'http://localhost:5000/duenos';

//Array de datos
let duenos = [];

//Funciones

async function listarDuenos() {

    try {

        const respuesta = await fetch(servURL);
        const duenosRes = await respuesta.json();
        if (Array.isArray(duenos)) {
            duenos = duenosRes;
        }
    } catch (error) {

        throw error;
    }

    let htmlDuenos;

    if (duenos.length > 0) {
        htmlDuenos = duenos.map((dueno, indice) => `
            <tr>
                <th scope="row">${indice+1}</th>
                <td>${dueno.nombre}</td>
                <td>${dueno.apellido}</td>
                <td>${dueno.pais}</td>
                <td>${dueno.identificacion}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" data-indice=${indice} class="btn btn-info editar">Editar</button>
                        <button type="button" data-indice=${indice} class="btn btn-danger eliminar">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join("");
    } else {
        htmlDuenos = `
            <tr>
                <th scope="row" colspan="6" style="text-align: center;">No hay duenos en la lista...</th>
            </tr>
        `;
    }

    //Inyectando al html
    listaDuenos.innerHTML = htmlDuenos;

    Array.from(document.querySelectorAll('.editar')).forEach((botonEditar) => {
        botonEditar.onclick = editar;
    });

    Array.from(document.querySelectorAll('.eliminar')).forEach((botonEliminar) => {
        botonEliminar.onclick = eliminar;
    });
}

async function enviarDatos(e) {
    e.preventDefault();

    try {
        
        const accion = btnGuardar.textContent;

        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            pais: pais.value,
            identificacion: identificacion.value
        };

        //Variables de método y url destino
        let method = 'PUT';
        let urlUsada = `${servURL}/${index.value}`;

        if(accion == 'Guardar') {      //Si es para crear un nuevo veterinario, se cambian los datos
            //Guardar nuevos datos
            method = 'POST';
            urlUsada = servURL;
        }

        //Obteniendo la respuesta del servidor
        let respuesta = await fetch(urlUsada, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        let servRes = await respuesta.json();

        if(respuesta.ok) {
            console.log(servRes);

            listarDuenos();
            cerrar.click();
        
            resetModal();
        }
    } catch (error) {

        throw error;
    }
}

function editar(e) {
    btnGuardar.textContent = 'Editar';

    const indice = e.target.dataset.indice;

    $('#exampleModal').modal('toggle');

    const dueno = duenos[indice];
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    pais.value = dueno.pais;
    identificacion.value = dueno.identificacion;
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

async function eliminar(e) {

    const indice = e.target.dataset.indice;
    
    try {

        //Variable de url destino
        let urlUsada = `${servURL}/${indice}`;

        //Obteniendo la respuesta del servidor
        let respuesta = await fetch(urlUsada, {
            method: 'DELETE'
        });

        let servRes = await respuesta.json();

        if(respuesta.ok) {
            console.log(servRes);

            listarDuenos();
        }
    } catch (error) {

        throw error;
    }
}

//Event listeners

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;

listarDuenos();