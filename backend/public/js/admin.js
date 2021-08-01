const tbody = document.querySelector('#tablaBody');
const btnSesion = document.querySelector('#cerrarSesion');
const btnBorrar = document.querySelector('#borrar');
const modal2 = document.querySelector('#myModal2');
const btnPut = document.querySelector('#modificar');
const alertanav = document.querySelector('#alerta');
const alertanavUpdate = document.querySelector('#alertaupdate');

document.addEventListener('DOMContentLoaded', async() => {
    //https://teclanode.azurewebsites.net/tienda/admin/registros
    await consultarUsuarios('http://localhost:8080/tienda/admin/registros');

    btnSesion.addEventListener('click', function() {
        //document.cookie = 'token' + '=; Max-Age=-99999999;';
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.replace('/tienda/login')
    })
    const deletebtn = document.querySelectorAll('.email');
    const updatebtn = document.querySelectorAll('.emailU');

    for (let i = 0; i < deletebtn.length; i++) {
        deletebtn[i].addEventListener('click', () => {
            const email = deletebtn[i].getAttribute('id');
            btnBorrar.addEventListener('click', () => {
                console.log(`Borrando ${email}`);
                borrarUsuario(email);
                // modal2.classList = 'hide'
                alertanav.appendChild(alerta("Usuario eliminado"));
                window.location.reload();
            })

        })
    }

    for (let i = 0; i < updatebtn.length; i++) {
        updatebtn[i].addEventListener('click', () => {
            const email = updatebtn[i].getAttribute('id');
            btnPut.addEventListener('click', async() => {
                const nombre = document.querySelector('#inputnombre').value;
                const apellido = document.querySelector('#inputapellido').value;
                const emailnuevo = document.querySelector('#inputemail').value;
                const password = document.querySelector('#inputpassword').value
                const estado = document.querySelector('#inputestado').value;

                const formData = new URLSearchParams();
                formData.append('nombre', nombre);
                formData.append('apellido', apellido);
                formData.append('email', emailnuevo);
                formData.append('estado', estado);
                formData.append('password', password)
                console.log(formData);

                const response = await fetch('http://localhost:8080/tienda/admin/update/' + email, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formData,
                    //JSON.stringify({ nombre: nombre, apellido: apellido, email: email }),
                });
                const data = await response.json();
                alertanavUpdate.appendChild(alerta("Usuario  modificado"));
                window.location.reload();

            })
        })

    }

});



const borrarUsuario = async(email) => {
    //admin/delelete/

    const response = await fetch('http://localhost:8080/tienda/admin/delelete/' + email, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
}

// const updateUsuario = async(email) => {
//     const response = await fetch('http://localhost:8080/tienda/admin/update/' + email, {
//         method: 'PUT',
//     });

// }






async function consultarUsuarios(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        //  console.log(data[i]);
        const { id_cliente, nombre, apellido, email, password, activo } = data[i];
        crearFila(id_cliente, nombre, apellido, email, password, activo);
    }

    const deletebtn = document.querySelectorAll('.email');
    console.log(tbody);
    console.log(deletebtn)
}

function alerta(mensaje) {
    const divAlert = document.createElement('div');
    divAlert.classList = 'alert alert-success'
    divAlert.innerHTML = mensaje
    return divAlert;
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
    tdIconos.innerHTML = `<button href="#myModal2" id=${email} data-toggle="modal" class="email btn-danger"><i class="fas fa-trash-alt "></i></button>  <button href="#myModal3"  class = "emailU btn-primary" id=${email} data-toggle="modal"><i class="fas fa-pencil-alt"></i></button>  `;
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