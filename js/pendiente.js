// Funcional Pendientes


function armarTablaPendientes(){
    filasTabla.innerHTML="";
    for (ticket of tickets){
        filasTabla.innerHTML=filasTabla.innerHTML+`
        <tr>
            <td>
            <img src="images/${ticket.operario.email}" id="imgOpe" class="img-tabla"alt="1">
            </td>
            <td>${ticket.nroTicket}</td>
            <td>${ticket.chasis}</td>
            <td>${ticket.origen}</td>
            <td>${ticket.chofer}</td>
            <td>${ticket.bruto.valor}</td>
            <td>${ticket.tara.valor}</td>
            <td>${ticket.neto}</td>
            <td>
                <button type="button" class="imp btn btn-info btn-sm px-2"><i class="imp bi bi-printer"></i></button>
                <button type="button" class="del btn btn-danger btn-sm px-2"><i class="del bi bi-trash"></i></button>
            </td>
        </tr>
        `
    }
}

filasTabla.addEventListener('click', function(e) {
    if (e.target.classList.contains('imp')) {
        let fila = e.target.closest('tr');
        imprimir(fila);
    }
    if (e.target.classList.contains('del')) {
        let fila = e.target.closest('tr');
        let index = Array.from(filasTabla.rows).indexOf(fila);
        tickets.splice(index, 1);
        armarTablaPendientes();
        guardarEnStorage(tickets);
    }
});

function imprimir(fila) {
    let index = Array.from(filasTabla.rows).indexOf(fila);
    let ticket = tickets[index];
    imprimirTicket(ticket,0);
}


btnVolverAPeso.addEventListener("click", function(){
    reestablecerPesoAutomatico()
    toggle(2,false)
})

btnCancelarPendiente.addEventListener("click", function(){
    toggle(1,false);
})

// Funcional Mensajes

btnContinuar.addEventListener("click", function(){
    toggle(1,false);
})

btnLimpLista.addEventListener("click", function(){
    Swal.fire({
        title: "APA! Atencion con esto!",
        text: `Esta accion eliminara todos los tickets de forma permanete, seguro que queres continuar?.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrala!"
        }).then((result) => {
        if (result.isConfirmed) {
            limpiarStorage();
            tickets = [];
            armarTablaPendientes();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
})