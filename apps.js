const actividades = [
    "Programacion",
    "Redes",
    "Ofimatica"
];

const selectActividad = document.getElementById("actividad");
const form = document.getElementById("formActividad");
const tabla = document.getElementById("tablaInscripciones");

let inscripciones = [];
let indiceEditar = null;

actividades.forEach(actividad => {
    const option = document.createElement("option");
    option.value = actividad;
    option.textContent = actividad;
    selectActividad.appendChild(option);
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const actividad = selectActividad.value;
    const turno = document.querySelector('input[name="turno"]:checked').value;

    const nuevaInscripcion = { nombre, actividad, turno };

    if (indiceEditar === null) {
        inscripciones.push(nuevaInscripcion);
    } else {
        inscripciones[indiceEditar] = nuevaInscripcion;
        indiceEditar = null;
    }

    form.reset();
    renderTabla();
});

function renderTabla() {
    tabla.innerHTML = "";

    inscripciones.forEach((inscripcion, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${inscripcion.nombre}</td>
                <td>${inscripcion.actividad}</td>
                <td>${inscripcion.turno}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="editarInscripcion(${index})">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarInscripcion(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function eliminarInscripcion(index) {
    inscripciones.splice(index, 1);
    renderTabla();
}

function editarInscripcion(index) {
    const inscripcion = inscripciones[index];

    document.getElementById("nombre").value = inscripcion.nombre;
    selectActividad.value = inscripcion.actividad;

    document.querySelector(
        `input[name="turno"][value="${inscripcion.turno}"]`
    ).checked = true;

    indiceEditar = index;
}