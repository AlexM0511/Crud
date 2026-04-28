const actividades = [
    "Fútbol",
    "Baloncesto",
    "Natación",
    "Programación",
    "Tenis"
];
const actividad = document.getElementById("actividad");
const form = document.getElementById("formActividad");
const tabla = document.getElementById("tablaInscripciones");
const buscador = document.getElementById("buscador");
let inscripciones = [];
actividades.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    actividad.appendChild(option);
});
form.addEventListener("submit", e => {
    e.preventDefault();
    const nueva = {
        nombre: document.getElementById("nombre").value,
        actividad: actividad.value,
        turno: document.querySelector('input[name="turno"]:checked').value
    };
    inscripciones.push(nueva);
    mostrar();
    form.reset();
});
function mostrar(){
    tabla.innerHTML = "";
    inscripciones.forEach((item, index) => {
        tabla.innerHTML += `
     
            <tr>
                <td>${item.nombre}</td>
                <td>${item.actividad}</td>
                <td>
                    <span class="badge bg-${item.turno == "Mañana" ? "warning text-dark" : "info text-dark"}">
                        ${item.turno}
                    </span>
                </td>
                <td>
                    <button class="btn-editar"
                        onclick="editar(${index})">
                        Editar
                    </button>
                    <button class="btn-eliminar"
                        onclick="eliminar(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}
function eliminar(index){
    inscripciones.splice(index,1);
    mostrar();
}
function editar(index){
    const item = inscripciones[index];
    document.getElementById("nombre").value = item.nombre;
    actividad.value = item.actividad;
    item.turno == "Mañana"
        ? document.getElementById("manana").checked = true
        : document.getElementById("tarde").checked = true;
    eliminar(index);
}
buscador.addEventListener("keyup", () => {
    const texto = buscador.value.toLowerCase();
    const filas = document.querySelectorAll("#tablaInscripciones tr");
    filas.forEach(fila => {
        fila.style.display =
            fila.textContent.toLowerCase().includes(texto)
            ? ""
            : "none";
    });
});
