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

//API route to 'mascotas'
const servURL = 'http://localhost:5000/mascotas';

//Array de datos

let mascotas = [];

//Funciones

async function listarMascotas() {
    
    try {

        const respuesta = await fetch(servURL);
        const mascotasRes = await respuesta.json();
        if (Array.isArray(mascotasRes)) {
            mascotas = mascotasRes;
        }
    } catch (error) {

        throw(error);
    }

    let htmlMascotas;
    
    if(mascotas.length > 0) {
        htmlMascotas = mascotas.map((mascota, indice) => `
            <tr>
                <th scope="row">${indice+1}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" data-indice=${indice} class="btn btn-info editar">Editar</button>
                        <button type="button" data-indice=${indice} class="btn btn-danger eliminar">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join("");
    } else {
        htmlMascotas = `
            <tr>
                <th scope="row" colspan="5" style="text-align: center;">No hay mascotas en la lista...</th>
            </tr>
        `;
    }

    //Inyectando al html
    listaMascotas.innerHTML = htmlMascotas;

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

        //Creando el objeto literal con la información de la nueva mascota
        const datos = {
            tipo: tipo.value,
            nombre: nombre.value,
            dueno: dueño.value
        };

        //Variables de método y url destino
        let method = 'PUT';
        let urlUsada = `${servURL}/${index.value}`;

        if(accion == 'Guardar') {   //Si es para crear una nueva mascota, se cambian los datos
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

            listarMascotas();
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

    const mascota = mascotas[indice];

    nombre.value = mascota.nombre;
    dueño.value = mascota.dueno;
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

            listarMascotas();
        }
    } catch (error) {
        throw error;
    }
}

//Event listeners

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;

listarMascotas();