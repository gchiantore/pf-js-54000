// Funcinal del PIN

pin1.addEventListener("keyup", function(e){
    if (validar(e.key)){
        nPin=e.key;
        pin1.value="*";
        pin2.focus();
    }else{
        pin1.value="";
        pin1.focus();
    }
})

pin2.addEventListener("keyup", function(e){
    if (validar(e.key)){
        nPin=nPin+e.key;
        pin2.value="*";
        pin3.focus();
    }else{
        if (e.key==="Backspace"){
            pin2.value="";
            pin1.focus();
        }else{
            pin2.value="";
            pin2.focus();
        }
        
    }
})

pin3.addEventListener("keyup", function(e){
    if (validar(e.key)){
        nPin=nPin+e.key;
        pin3.value="*";
        pin4.focus();
    }else{
        if (e.key==="Backspace"){
            pin3.value="";
            pin2.focus();
        }else{
            pin3.value="";
            pin3.focus();
        }
    }
})

pin4.addEventListener("keyup", function(e){
    if (validar(e.key)){
        nPin=nPin+e.key;
        pin4.value="*";
        if (tomarOperador(nPin)){
            toggle(2);
        }else{
            pin4.value="";
            pin3.value="";
            pin2.value="";
            pin1.value="";
            pin1.focus();
            Swal.fire({
                title: "Upss!",
                text: "El pin ingresado no corresponde a ningun usuario registrado",
                icon: "error",
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-info'
                },
                confirmButtonText: 'Entendido'
            });
        }
    }else{
        if (e.key==="Backspace"){
            pin4.value="";
            pin3.focus();
        }else{
            pin4.value="";
            pin4.focus();
        }
    }
})
function validar(numero){
    if (numero>="0" && numero<="9"){
        return true;
    }    
}