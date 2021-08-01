const btnSesion = document.querySelector('#cerrarSesion');

document.addEventListener('DOMContentLoaded', () => {
    btnSesion.addEventListener('click', function() {
        //document.cookie = 'token' + '=; Max-Age=-99999999;';
        document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        window.location.replace('/tienda/login')
    })
})