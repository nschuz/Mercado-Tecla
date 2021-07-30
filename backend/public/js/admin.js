const tbody = document.querySelector('#tablaBody');



document.addEventListener('DOMContentLoaded', () => {
    consultarUsuarios('https://teclanode.azurewebsites.net');
});


async function consultarUsuarios(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        //  console.log(data[i]);
        const { id_cliente, nombre, apellido, email, password, activo } = data[i];
        crearFila(id_cliente, nombre, apellido, email, password, activo);
    }
}

function crearFila(id_cliente, nombre, apellido, email, password, activo) {
    const tr = document.createElement('tr');
    const tid = document.createElement('td');
    tid.innerHTML = id_cliente;
    const tdnombre = document.createElement('td');
    tdnombre.innerHTML = nombre;
    const tdApellido = document.createElement('td');
    tdApellido.innerHTML = apellido;
    const tdEmail = document.createElement('td');
    tdEmail.innerHTML = email;
    const tdIconos = document.createElement('td');
    tdIconos.innerHTML = '<a href="user.html"><i class="fas fa-pencil-alt"></i></a>'
        ////<a href="#myModal" role="button" data-toggle="modal"><i class="fas fa-trash-alt"></i></a>'
        //const icono1= document.createElement('a');
        //icono1.innerHTML = '<a href="user.html"><i class="fas fa-pencil-alt"></i></a>'

    const tpass = document.createElement('td');
    tpass.innerHTML = activo

    tr.appendChild(tid);
    tr.appendChild(tdnombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEmail);
    tr.appendChild(tpass);
    tr.appendChild(tdIconos);


    tbody.appendChild(tr);


}