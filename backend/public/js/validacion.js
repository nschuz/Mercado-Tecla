document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("datosCompra").addEventListener('submit', validarFormulario); 
});

function validarFormulario(evento) {
    evento.preventDefault();
    let calle = document.getElementById('calle').value;
    let colonia = document.getElementById('colonia').value;
    let municipio = document.getElementById('municipio').value;
    let estado = document.getElementById('estado').value;
    let numTarjeta = document.getElementById('numTarjeta').value;
    let mesExpiracion = document.getElementById('mesExpiracion').value;
    let anioExpiracion = document.getElementById('anioExpiracion').value;
    let cvv = document.getElementById('cvv').value;

    if(calle === null || calle == 0 || /^\s+$/.test(calle)) {
        // alert('Calle no valida');
        alert(`${mesExpiracion}`);
        return;
    }
    if(colonia === null || colonia == 0 || /^\s+$/.test(colonia)) {
        alert('Colonia no valida');
        return;
    }
    if(municipio === null || municipio == 0 || /^\s+$/.test(municipio)) {
        alert('Municipio no valido');
        return;
    }
    if(estado === null || estado == 0 || /^\s+$/.test(estado)) {
        alert('Estado no valido');
        return;
    }
    if(numTarjeta === null || numTarjeta == 0 || numTarjeta.length < 16 || numTarjeta.length > 16) {
        alert('Numero De Tarteta No Valido');
        return;
    }
    if(mesExpiracion === 'mes') {
        alert('Mes no valido');
        return;
    }
    if(anioExpiracion === 'anio') {
        alert('Año no valido');
        return;
    }
    if(cvv === null || cvv == 0 || cvv.length < 3 || cvv.length > 3) {
        alert('Numero De Tarteta No Valido');
        return;
    }




    this.submit();
}
