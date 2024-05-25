/*
ESTA APP ES PARA PESAR CAMIONES EN UNA BALANZA PUBLICA, LA IDEA ES QUE EL CAMION SUBA Y PESE YA SEA CARGADO (BRUTO) O 
DESCARGADO (TARA), EL USUARIO PREGUNTA SI EL PESO ES TARA O BRUTO Y SE PORCEDE A GENERAR EL TICKET DE PESADA, COMPLETANDO EL 
PESO RESTANTE MANUALMENTE. 

*/


// Definicion Clase Usuario
class Usuario {
    constructor(id, nombre, pin, pass ,user, email, telefono, imagen, cdo_debo) {
        this.id = id;
        this.nombre = nombre;
        this.pin = pin;
        this.pass = pass;
        this.user = user
        this.email = email;
        this.telefono = telefono;
        this.imagen = imagen;
        this.cdo_debo = cdo_debo;
    }

}

// Definicion Clase Peso
class Peso {
    constructor(valor,modo,medida,fecha,operador,tipo){
        this.valor=valor;
        this.modo=modo;
        this.medida=medida;
        this.fecha=fecha;
        this.operador=operador;
        this.tipo=tipo;
    }
}

// Definicion Clase Ticket
class Tk {
    constructor(nroTicket, fecha, empresa, operario, origen, destino, producto, bruto, tara, neto, chasis, acoplado, chofer, condicion, precio, observaciones, pendiente, ctaDebo) {
        this.nroTicket = nroTicket;
        this.fecha = fecha;
        this.empresa = empresa;
        this.operario = operario;
        this.origen = origen;
        this.destino = destino;
        this.producto = producto;
        this.bruto = bruto;
        this.tara = tara;
        this.neto = neto;
        this.chasis = chasis;
        this.acoplado = acoplado;
        this.chofer = chofer;
        this.condicion = condicion;
        this.precio = precio;
        this.observaciones = observaciones;
        this.pendiente = pendiente;
        this.ctaDebo = ctaDebo;
    }
}

// Funcion General para obtener los usuarios de la base de datos
function obtenerUsuarios(){
    let usuarios=[];    
    fetch("./data/users.json")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((user) => {
            usuarios.push(new Usuario(
                user.id,  
                user.nombre,
                user.pin,
                user.pass,
                user.user,
                user.email,
                user.telefono,
                user.fotos,
                user.cdo_debo
            ))
        });
    });
    return usuarios;
}

// Funcion General para obtener los datos del operador logueado
function tomarOperador(npin){
    return usuarios.find( usuario => usuario.pin == npin)
}

// Funcion para obtener la fecha formateada 
function formatearFecha(fecha){
    if (fecha===undefined){
        return "Sin fecha"; 
    }else{
        var fechaAFormatear = fecha;
        var dia = fechaAFormatear.getDate();
        var mes = fechaAFormatear.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
        var anio = fechaAFormatear.getFullYear();
        var hora = fechaAFormatear.getHours();
        var minutos = fechaAFormatear.getMinutes();
        var segundos = fechaAFormatear.getSeconds();
        return fechaHoraFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    }
};

// Funcion Para validad Peso
function validaPesoTomado(peso){
    if (parseInt(peso)>=100){
        return true;
    }else{
        alert("El Peso debe ser mayor a 100");
        return false;
    }
}

// Funcion para obtener el ultimo Ticekt, y determinar el proximo numero
function obtenerUltimoTicket(){
    if (tickets.length==0){
        return 0;
    }else{    
        return tickets[tickets.length-1].nroTicket;
    }
}

// Esta funcion permite volver a leer el peso en forma automatica desde el cabezal de la balanza
function reestablecerPesoAutomatico(){
    pesoManual.style.display="";
    pesoAutomatico.style.display="none";
    divPesoManual.style.display="none";
    pesoTomado.innerText="0";
    //Llamar a la funcion para iniciar el reloj (server flask en la balanza)
    modoPeso.innerText="AUT.";
}

// Esta funcion para la lectura del peso automaticamente y permite ingresar un peso en forma manual
function establecerPesoManual(){
    pesoManual.style.display="none";
    pesoAutomatico.style.display="";
    divPesoManual.style.display="";
    campoPesoManual.value="";
    campoPesoManual.focus();
    pesoTomado.innerText="0";
    modoPeso.innerText="MAN.";
}    

// Funcional de las Secciones 

// Esta funcion oculta y muestra las distitas secciones de la app 
function toggle(seccion,par1){ 
    switch (seccion){
        case 1:
            vaciarFormulario();
            reestablecerPesoAutomatico();
            seccionPin.style.display = "";
            pin1.focus();
            seccionPeso.style.display = "none";
            seccionOperacion.style.display = "none";
            seccionTomaNevoTicket.style.display = "none";
            seccionTomaPendiente.style.display = "none";
            seccionMensaje.style.display = "none";
            contOp.style.display="none";
            break;
        case 2: 
            peso=pesoVacio;
            contOp.style.display="";
            seccionPin.style.display = "none";
            seccionPeso.style.display = "";
            operadorImg.src="images/"+tomarOperador(nPin).email;
            operador.innerText=tomarOperador(nPin).nombre;
            pesoTomado.innerText="0";
            //Llamar a la funcion para iniciar el reloj (server flask en la balanza)
            //Habilito Peso Manual
            seccionOperacion.style.display = "none";
            seccionTomaNevoTicket.style.display = "none";
            seccionTomaPendiente.style.display = "none";
            seccionMensaje.style.display = "none";
            break;
        case 3:
            contOp.style.display="";
            seccionPin.style.display = "none";
            seccionPeso.style.display = "none";
            seccionOperacion.style.display = "";
            pesoValor.innerHTML=`Peso Tomado : <strong>${peso.valor} ${peso.medida}</strong>`;
            pesoTipo.innerHTML=`Tipo : <strong>${peso.tipo}</strong>`;
            pesoModo.innerHTML=`Modo : <strong>${peso.modo}</strong>`;
            pesoFecha.innerHTML=`Fecha : <strong>${formatearFecha(peso.fecha)}</strong>`;
            pesoOperardor.innerHTML=`Operador : <strong>${peso.operador}</strong>`;
            seccionTomaNevoTicket.style.display = "none";
            seccionTomaPendiente.style.display = "none";
            seccionMensaje.style.display = "none";
            break;
        case 4:
            contOp.style.display="";
            seccionPin.style.display = "none";
            seccionPeso.style.display = "none";
            seccionOperacion.style.display = "none";
            seccionTomaPendiente.style.display = "none";
            seccionMensaje.style.display = "none";    
            iniciaTicket();
            break;
        case 5:
            contOp.style.display="";
            seccionPin.style.display = "none";
            seccionPeso.style.display = "none";
            seccionOperacion.style.display = "none";
            seccionTomaNevoTicket.style.display = "none";
            seccionTomaPendiente.style.display = "";
            armarTablaPendientes();
            seccionMensaje.style.display = "none";
            break;
        case 6:
            contOp.style.display="";
            seccionPin.style.display = "none";
            seccionPeso.style.display = "none";
            seccionOperacion.style.display = "none";
            seccionTomaNevoTicket.style.display = "none";
            seccionTomaPendiente.style.display = "none";
            seccionMensaje.style.display = "";
            if (par1){
                mensajeExclamacion.innerText = "Genial!";
                mensajeIcono.innerHTML = `<i class="icono-grande text-success bi bi-file-check-fill"></i>`;
                mensajeMensaje.innerText = "El Ticket se guardo con exito";
            }else{
                mensajeExclamacion.innerText = "Ups!";
                mensajeIcono.innerHTML = `<i class="icono-grande text-danger bi bi-x-square-fill"></i>`;
                mensajeMensaje.innerText = "No se pudo guardar el ticket";
            }    
            break;
    }

}   

function guardarEnStorage(tickets){
    let listaTicektJSON = JSON.stringify(tickets);
    localStorage.setItem('listaTickets', listaTicektJSON);
}

function limpiarStorage(){
    localStorage.clear();
}   


// Variables Globales
let usuarios=obtenerUsuarios();
let nPin="";
let peso=new Peso();
let pesoVacio=new Peso();
let bruto=new Peso();
let tara=new Peso();
let contador=0;
let tickets=[];
if (localStorage.getItem("listaTickets")){
    tickets=JSON.parse(localStorage.getItem("listaTickets"));
}
let condicion=true;
let ctaDebo=0;
pesoVacio.fecha="";
pesoVacio.valor=0;
pesoVacio.medida="";
pesoVacio.modo="";
pesoVacio.tipo="";
pesoVacio.operador=0;
let precio=5000;
toggle(1);