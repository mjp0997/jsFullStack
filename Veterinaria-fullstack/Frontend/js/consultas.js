const listaConsultas = document.querySelector('#lista_consultas');
const mascota = document.querySelector('#mascota');
const veterinario = document.querySelector('#veterinario');
const diagnostico = document.querySelector('#diagnostico');
const historia = document.querySelector('#historia');
const index = document.querySelector('#indice');
const btnGuardar = document.querySelector('#guardar');
const btnNuevo = document.querySelector('#btn-nuevo');
const cerrar = document.querySelector('#cerrar');
const contenedorModal = document.querySelector('#exampleModal');

//API route to 'consultas'
const servURL = 'http://localhost:5000/consultas';
//API route to 'mascotas'
const mascotasURL = 'http://localhost:5000/mascotas';
//API route to 'veterinarios'
const veterinariosURL = 'http://localhost:5000/veterinarios';

//Array de datos
let consultas = [];
let mascotas = [];
let veterinarios = [];

//Funciones

async function listarConsultas() {
    
    try {

        const respuesta = await fetch(servURL);
        const consultasRes = await respuesta.json();
        if (Array.isArray(consultasRes)) {
            consultas = consultasRes;
        }
    } catch (error) {

        throw(error);
    }

    let htmlConsultas;
    
    if(consultas.length > 0) {
        htmlConsultas = consultas.map((consulta, indice) => {
            let fecha = new Date(consulta.fecha);
            //Si el día es inferior a 10, se le agrega un 0 al inicio
            let dia = fecha.getDate() > 9 ? fecha.getDate() : '0'+fecha.getDate();
            //Si el mes es inferior a 10, se le agrega un 0 al inicio
            let mes = fecha.getMonth() > 8 ? fecha.getMonth()+1 : '0'+(fecha.getMonth()+1);

            return `
                <tr>
                    <th scope="row">${indice+1}</th>
                    <td>${consulta.dataMascota.nombre}</td>
                    <td>${consulta.dataVeterinario.nombre} ${consulta.dataVeterinario.apellido}</td>
                    <td>${consulta.diagnostico}</td>
                    <td>${dia}/${mes}/${fecha.getFullYear()}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" data-indice=${indice} class="btn btn-info editar">Editar</button>
                        </div>
                    </td>
                </tr>
            `
        }).join("");    //Join para concatenar string dentro de la función map, filter, etc. El parámetro es el divisor que queremos usar
    } else {
        htmlConsultas = `
            <tr>
                <th scope="row" colspan="6" style="text-align: center;">No hay consultas en la lista...</th>
            </tr>
        `;
    }

    //Inyectando al html
    listaConsultas.innerHTML = htmlConsultas;

    Array.from(document.querySelectorAll('.editar')).forEach((botonEditar) => {
        botonEditar.onclick = editar;
    });
}

async function listarMascotas() {
    try {

        const respuesta = await fetch(mascotasURL);
        const mascotasRes = await respuesta.json();
        if (Array.isArray(mascotasRes)) {
            mascotas = mascotasRes;
        }

        if (mascotas.length > 0) {
            const htmlMascotas = mascotas.map((pet, i) => {
                return `
                    <option value="${i}">${pet.nombre}</option>
                `
            }).join('');

            mascota.innerHTML += htmlMascotas;
        }
    } catch (error) {

        throw(error);
    }
}

async function listarVeterinarios() {
    try {

        const respuesta = await fetch(veterinariosURL);
        const veterinariosRes = await respuesta.json();
        if (Array.isArray(veterinariosRes)) {
            veterinarios = veterinariosRes;
        }

        if (veterinarios.length > 0) {
            const htmlVeterinarios = veterinarios.map((vet, i) => {
                return `
                    <option value="${i}">${vet.nombre} ${vet.apellido}</option>
                `
            }).join('');

            veterinario.innerHTML += htmlVeterinarios;
        }
    } catch (error) {

        throw(error);
    }
}

async function enviarDatos(e) {
    e.preventDefault();

    try {

        const accion = btnGuardar.textContent;

        //Creando el objeto literal con la información de la nueva mascota
        const datos = {
            mascota: mascota.value,
            veterinario: veterinario.value,
            historia: historia.value,
            diagnostico: diagnostico.value
        };

        if (validar(datos)) {
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

                listarConsultas();
                cerrar.click();

                resetModal();
            }
        }
    } catch (error) {
        
        throw error;
    }
}

function validar(data) {

    const {mascota: mascotaVal, veterinario: veterinarioVal, historia: historiaVal, diagnostico: diagnosticoVal} = data;
    
    if(mascotaVal == 'Seleccionar mascota') {
        mascota.classList.add('is-invalid');
        return false;
    }

    if(veterinarioVal == 'Nombre del veterinario') {
        veterinario.classList.add('is-invalid');
        return false;
    }

    if(historiaVal == '') {
        historia.classList.add('is-invalid');
        return false;
    }

    if(diagnosticoVal == '') {
        diagnostico.classList.add('is-invalid');
        return false;
    }
    return true;
}

function eliminarValorInvalido() {

    if(this.classList.contains('is-invalid')) {
        this.classList.remove('is-invalid');
    }
}

function editar(e) {
    btnGuardar.textContent = 'Editar';

    const indice = e.target.dataset.indice;

    $('#exampleModal').modal('toggle');

    const consulta = consultas[indice];

    veterinario.value = consulta.veterinario;
    mascota.value = consulta.mascota;
    diagnostico.value = consulta.diagnostico;
    historia.value = consulta.historia;
    index.value = indice;
}

function resetModal() {
    veterinario.value = "Nombre del veterinario";
    mascota.value = "Seleccionar mascota";
    diagnostico.value = "";
    historia.value = "";
    index.value = "";
    btnGuardar.textContent = 'Guardar';
}

//Event listeners

btnNuevo.onclick = resetModal;
btnGuardar.onclick = enviarDatos;
mascota.onchange = eliminarValorInvalido;
veterinario.onchange = eliminarValorInvalido;
historia.oninput = eliminarValorInvalido;
diagnostico.oninput = eliminarValorInvalido;

listarConsultas();
listarMascotas();
listarVeterinarios();