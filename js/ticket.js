
//Comportamiento del Formulario Nvo Ticket


ticketOrigen.addEventListener("keyup", function(e){
    ticketOrigen.value=ticketOrigen.value.toUpperCase();
})
ticketOrigen.addEventListener("blur", function(e){
    if (ticketOrigen.value==""){
        ticketOrigen.focus();
    }
})

ticketDestino.addEventListener("keyup", function(e){
    ticketDestino.value=ticketDestino.value.toUpperCase();
})
ticketDestino.addEventListener("blur", function(e){
    if (ticketDestino.value==""){
        ticketDestino.focus();
    }
})

ticketBruto.addEventListener("input", function(e) {
    let valor = e.target.value;
    e.target.value = valor.replace(/\D/g, "");
});


ticketBruto.addEventListener("blur", function(e){
    if ((ticketBruto.value>ticketTara.value)||(ticketBruto.value==0)){
        ticketNeto.value=ticketBruto.value-ticketTara.value;
        if (ticketBruto.value>0){
            bruto.valor=ticketBruto.value;
            bruto.modo=modoPeso.innerText[0];
            bruto.medida=modoKg.innerText;
            bruto.fecha=formatearFecha(new Date());
            bruto.operador=tomarOperador(nPin).id;
            bruto.tipo="T";
            if (validaPesoTomado(bruto.valor)){
                console.log(peso);
            }
        }    
    }else{
        ticketBruto.focus();
        ticketBruto.Selected();
    }
})

ticketTara.addEventListener("blur", function(e){
    if ((ticketTara.value<ticketBruto.value)||(ticketTara.value==0)){
        ticketNeto.value=ticketBruto.value-ticketTara.value;
        if (ticketTara.value>0){
            tara.valor=ticketTara.value;
            tara.modo=modoPeso.innerText[0];
            tara.medida=modoKg.innerText;
            tara.fecha=formatearFecha(new Date());
            tara.operador=tomarOperador(nPin).id;
            tara.tipo="T";
            if (validaPesoTomado(tara.valor)){
                console.log(peso);
            }
        }
    }else{
        ticketTara.focus();
        ticketTara.Selected();
    }
})


ticketTara.addEventListener("input", function(e) {
    let valor = e.target.value;
    e.target.value = valor.replace(/\D/g, "");
});

ticketChasis.addEventListener("keyup", function(e){
    ticketChasis.value=ticketChasis.value.toUpperCase();
});

ticketChasis.addEventListener("blur", function(e){
    if (ticketChasis.value==""){
        ticketChasis.focus();
    }
})

ticketAcoplado.addEventListener("keyup", function(e){
    ticketAcoplado.value=ticketAcoplado.value.toUpperCase();
});

ticketChofer.addEventListener("keyup", function(e){
    ticketChofer.value=ticketChofer.value.toUpperCase();
});

ticketCtaCte.addEventListener("change", function(e) {
    if (e.target.checked) {
        condicion=true;
        modalDebo.style.display="";
        numeroDebo.value="";
        numeroDebo.focus();
    } else {
        condicion=false;
        ctaDebo="";
    }
});

numeroDebo.addEventListener("input", function(e) {
    let valor = e.target.value;
    e.target.value = valor.replace(/\D/g, "");
});

btnCdoDebo.addEventListener("click", function(e){
    if (numeroDebo.value){
        ctaDebo=numeroDebo.value;
        modalDebo.style.display="none";
    }
})

btnCancelarCdoDebo.addEventListener("click", function(e){
    modalDebo.style.display="none";
    ticketCtaCte.checked=false;
})


btnGuardarTicket.addEventListener("click", function(){
    completaTicket();
    toggle(6,true);
    
})    

btnTkImpreso.addEventListener("click", function(){
    modalImpresion.style.display = "none";
})
//Funcinal del Nuevo Ticket
function vaciarFormulario(){
    ticketOrigen.value="";
    ticketDestino.value="";
    ticketBruto.value="";
    ticketTara.value="";
    ticketChasis.value="";
    ticketAcoplado.value="";
    ticketChofer.value="";
    ticketCtaCte.checked=false;
    ticketProducto.selectedIndex = 0;
    ticketBruto.disabled=false;
    ticketTara.disabled=false;
}
function iniciaTicket(){
    const auxTicket=
    {
        nroTicket:0,
        fecha:"",
        operario:0,
        empresa:0
    }
    auxTicket.operario=tomarOperador(nPin);
    auxTicket.nroTicket=obtenerUltimoTicket()+1;
    auxTicket.empresa=1;
    auxTicket.fecha=formatearFecha(new Date());
    
    seccionTomaNevoTicket.style.display = "";
    ticketNumero.innerHTML=`Ticket Nro : <strong>${auxTicket.nroTicket}</strong>`;
    ticketFecha.innerHTML=`Fecha : <strong>${auxTicket.fecha}</strong>`;
    ticketOperador.innerHTML=`Operador : <strong>${auxTicket.operario.nombre}</strong>`
    ticketBruto.value=0;
    ticketTara.value=0;
    if (peso.tipo==="B"){
        bruto.valor=peso.valor;
        bruto.fecha=peso.fecha;
        bruto.medida=peso.medida;
        bruto.modo=peso.modo;
        bruto.operador=peso.operador;
        bruto.tipo=peso.tipo;
        tara=new Peso();
        ticketBruto.value=bruto.valor;
        ticketBruto.disabled=true;
        ticketNeto.value=ticketBruto.value - tara.valor;
    }else{
        tara.valor=peso.valor;
        tara.fecha=peso.fecha;
        tara.medida=peso.medida;
        tara.modo=peso.modo;
        tara.operador=peso.operador;
        tara.tipo=peso.tipo;
        bruto=new Peso();
        ticketTara.value=tara.valor;
        ticketTara.disabled=true;
        ticketNeto.value=tara.valor;
    }

    ticketNeto.disabled=true;
    ticketCtaCte.checked=false;
    ticketOrigen.focus();
}

function completaTicket(){
    let ticket=new Tk();
    ticket.operario=tomarOperador(nPin);
    ticket.nroTicket=obtenerUltimoTicket()+1;
    ticket.empresa=1;
    ticket.fecha=formatearFecha(new Date());
    ticket.neto=0;
    ticket.precio=precio;
    ticket.observaciones="";
    ticket.condicion=condicion;
    ticket.ctaDebo=ctaDebo;
    ticket.origen=ticketOrigen.value;
    ticket.destino=ticketDestino.value;
    ticket.producto=ticketProducto.value;
    ticket.chasis=ticketChasis.value;
    ticket.acoplado=ticketAcoplado.value;
    ticket.chofer=ticketChofer.value;
    ticket.bruto=bruto;
    ticket.tara=tara;
    ticket.neto=parseInt(ticketNeto.value);
    ticket.precio=parseFloat(precio);
    ticket.tara.valor===0 || ticket.bruto.valor===0 ? ticket.pendiente=true:ticket.pendiente=false;
    tickets.push(ticket);
    guardarEnStorage(tickets);
    
    Swal.fire({
        title: "Genial!",
        text: `El ticket Nro :${ticket.nroTicket} ha sido guardado con exito.`,
        icon: "success",
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-info'
        },
        confirmButtonText: 'Entendido'
    });
    
    if (!ticket.pendiente){        
        imprimirTicket(ticket,0);
    }
}


btnCancelarTicket.addEventListener("click", function(){
    toggle(1,false);
})

btnVolverAPesar.addEventListener("click", function(){
    reestablecerPesoAutomatico()
    toggle(2,false)
})


// Fucion Imprimir Ticket
function imprimirTicket(ticket,copias) {
    var ip_impresora = "192.168.100.1";
    var puerto_impresora = 9100;
    let dato=``;
    
    dato=dato+`************************************************\n`;
    dato=dato+`      O S C A R  C H I A N T O R E   S R L\n`;
    dato=dato+`\n`;
    dato=dato+`      Ruta 17 - Km. 176 - La Para - Córdoba\n`;
    dato=dato+`              WS: +549 3575 400209\n`;
    dato=dato+`       e-mail: cporte@oscarchiantore.com.ar\n`;
    dato=dato+`\n`;
    dato=dato+`************************************************\n`;
    dato=dato+`\n`;
    dato=dato+`         Servicio de Balanza Pública \n`;
    dato=dato+`\n`;
    dato=dato+`************************************************\n`;
    dato=dato+` \n`;
    dato=dato+`Ticket Nro.: ${ticket.nroTicket}\n`;
    dato=dato+`Fecha......: ${ticket.fecha}\n`;
    dato=dato+`Operario...: (${ticket.operario.id})-> ${ticket.operario.nombre}\n`;
    dato=dato+`\n`;
    dato=dato+`================================================\n`;
    dato=dato+`Origen.....: ${ticket.origen}\n`;
    dato=dato+`Destino....: ${ticket.destino}\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`Producto ..: ${ticket.producto}\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`          **** DETALLE DEL PESO ****\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`BRUTO : ${ticket.bruto.valor} ${ticket.bruto.medida} | ${ticket.bruto.modo} | ${ticket.bruto.operador} | ${ticket.bruto.fecha? ticket.bruto.fecha:""}\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`TARA  : ${ticket.tara.valor } ${ticket.tara.medida} | ${ticket.tara.modo} | ${ticket.tara.operador} | ${ticket.tara.fecha? ticket.tara.fecha:""}\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`NETO  : ${ticket.neto} kg.\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`DOMINIO CHASIS : ${ticket.chasis} \n`;
    dato=dato+`DOMINIO ACOPLADO : ${ticket.acoplado} \n`;
    dato=dato+`CHOFER : ${ticket.chofer}\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`CONDICION : ${ticket.condicion? "CTTE -> (" + ticket.ctaDebo + ")":"CTDO"}\n`;
    dato=dato+`IMPORTE   : $ 5000,00\n`;
    dato=dato+`------------------------------------------------\n`;
    dato=dato+`Observaciones :\n`;
    dato=dato+`\n`;
    dato=dato+`\n`;
    dato=dato+`\n`;
    dato=dato+`------------------------------------------------\n`;

    var texto = dato;
    if (copias===0){
        modalImpresion.style.display = "";
        tkImpreso.innerText = texto;    
    }else{
        var request = new XMLHttpRequest();
        request.open("POST", "http://192.168.100.111:5000/imprimir", true); // Si el servidor esta local, si esta en otra direccion poner la IP
        request.setRequestHeader("Content-Type", "text/plain");
        request.send(texto,ip_impresora,puerto_impresora,copias);   
    }
}

