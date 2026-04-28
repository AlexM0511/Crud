const form=document.getElementById("formPrestamo");
const tabla=document.getElementById("tablaPrestamos");
const btnGuardar=document.getElementById("btnGuardar");
let prestamos=[];
let editando=null;
if(localStorage.getItem("prestamos")){
    prestamos=JSON.parse(localStorage.getItem("prestamos"));
}
function guardarDatos(){
    localStorage.setItem("prestamos",JSON.stringify(prestamos));
}
form.addEventListener("submit",function(e){
    e.preventDefault();
    const prestamo={
        nombreAlumno:document.getElementById("nombreAlumno").value,
        material:document.getElementById("material").value,
        turno:document.querySelector('input[name="turno"]:checked').value,
        devuelto:document.getElementById("devuelto").checked
    };
    if(editando===null){
        prestamos.push(prestamo);
    }else{
        prestamos[editando]=prestamo;
        editando=null;
        btnGuardar.textContent="Guardar préstamo";
    }
    form.reset();
    guardarDatos();
    mostrarPrestamos();
});
function mostrarPrestamos(){
    tabla.innerHTML="";
    if(prestamos.length===0){

        tabla.innerHTML=`
        <tr>
            <td colspan="5" class="text-muted">
                No hay préstamos registrados
            </td>
        </tr>
        `;
        return;
    }
    prestamos.forEach(function(prestamo,index){
        const estado=prestamo.devuelto
        ?'<span class="badge bg-success">Sí</span>'
        :'<span class="badge bg-danger">No</span>';
        tabla.innerHTML+=`
        <tr>
            <td>${prestamo.nombreAlumno}</td>
            <td>${prestamo.material}</td>
            <td>${prestamo.turno}</td>
            <td>${estado}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editarPrestamo(${index})">
                    Editar
                </button>
                <button class="btn btn-danger btn-sm"
                    onclick="eliminarPrestamo(${index})">
                    Borrar
                </button>
            </td>
        </tr>
        `;
    });
}
function editarPrestamo(index){
    const prestamo=prestamos[index];
    document.getElementById("nombreAlumno").value=prestamo.nombreAlumno;
    document.getElementById("material").value=prestamo.material;
    document.getElementById("devuelto").checked=prestamo.devuelto;
    if(prestamo.turno==="Mañana"){
        document.getElementById("manana").checked=true;
    }else{
        document.getElementById("tarde").checked=true;
    }
    editando=index;
    btnGuardar.textContent="Actualizar préstamo";
}
function eliminarPrestamo(index){
    const confirmar=confirm("¿Seguro que quieres eliminar este préstamo?");
    if(confirmar){
        prestamos.splice(index,1);
        guardarDatos();
        mostrarPrestamos();
    }
}
mostrarPrestamos();
