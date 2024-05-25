pesoManual.addEventListener("click", function(){
    establecerPesoManual();
})

pesoAutomatico.addEventListener("click", function(){
    reestablecerPesoAutomatico();
})

campoPesoManual.addEventListener("keyup", function(e){
    pesoTomado.innerText=campoPesoManual.value
})
campoPesoManual.addEventListener("input", function(e) {
    let valor = e.target.value;
    e.target.value = valor.replace(/\D/g, "");
});

btnTara.addEventListener("click", function(){
    peso.valor=pesoTomado.innerText;
    peso.modo=modoPeso.innerText[0];
    peso.medida=modoKg.innerText;
    peso.fecha=formatearFecha(new Date());
    peso.operador=tomarOperador(nPin).id;
    peso.tipo="T";
    if (validaPesoTomado(peso.valor)){
        toggle(3,false);
    }    
})


btnBruto.addEventListener("click", function(){
    peso.valor=pesoTomado.innerText;
    peso.modo=modoPeso.innerText[0];
    peso.medida=modoKg.innerText;
    peso.fecha=formatearFecha(new Date());
    peso.operador=tomarOperador(nPin).id;
    peso.tipo="B";
    if (validaPesoTomado(peso.valor)){
        toggle(3,false);
    }
})

btnCancelar.addEventListener("click", function(){
    pesoManual.style.display="";
    pesoAutomatico.style.display="none";
    divPesoManual.style.display="none";
    pesoTomado.innerText="0";
    //Llamar a la funcion para iniciar el reloj (server flask en la balanza)
    modoPeso.innerText="AUT.";
    toggle(1,false);
})