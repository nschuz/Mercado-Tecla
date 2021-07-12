import { carrito } from "./models/Carrito.js";

export function pintarCarrito(){
    const items = document.getElementById('items');
    items.innerHTML = ''

    if(carrito.productos.length == 0) {
       carritoVacio();
    }

    Object.values(carrito.productos).forEach(producto => {
       const tr = document.createElement('tr')
       items.appendChild(tr)
       
       const imgTD = document.createElement('td')
       const img = document.createElement('img')
       img.className = "card-img-top imagenCarrito"
       img.setAttribute("src", producto.imagen)
       imgTD.appendChild(img)
       items.appendChild(imgTD)
       
       const nombre = document.createElement('td')
       nombre.innerHTML = producto.nombre
       items.appendChild(nombre)

       const cantidad = document.createElement('td')
       cantidad.innerHTML = producto.cantidad
       items.appendChild(cantidad)

       const botones = document.createElement('td');
       const botonPlus = document.createElement('button');
       const botonLess = document.createElement('button');
       botonPlus.className = "btn btn-info btn-sm botonMas";
       botonPlus.innerHTML = '+';
       botonLess.className = "btn btn-danger btn-sm botonMenos";
       botonLess.innerHTML = '-';
       botonPlus.addEventListener('click', e => {carrito.addUnProducto(e, producto.id)})
       botonLess.addEventListener('click', e => {carrito.dismunuyeUnProducto(e, producto.id)})
       botones.appendChild(botonPlus);
       botones.appendChild(botonLess);
       items.appendChild(botones)

       const total = document.createElement('td')
       let cantidadTotal = 0;
       cantidadTotal =  producto.precio * producto.cantidad
       total.innerHTML = '$' + cantidadTotal.toFixed(2);
       items.appendChild(total);

       const deleteButton = document.createElement('td');
       const trashButton = document.createElement('button');
       trashButton.className = 'btn btn-danger btn-sm botonMenos';
       trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>';
       trashButton.addEventListener('click', e => {carrito.removeProducto(e, producto.id)})
       deleteButton.appendChild(trashButton);
       items.appendChild(deleteButton);

       const totalCompra = document.getElementById('total')
       totalCompra.innerHTML = carrito.getTotal().toFixed(2);
    })
} 

function carritoVacio() {
    const tabla = document.getElementById('table-carrito');
    const carritoVacio = document.getElementById('carritoVacio');
    const volver = document.createElement('a')
    const br = document.createElement('br');
    tabla.innerHTML = '';
    carritoVacio.innerHTML = 'Carrito vacio, aun o has agregado productos :c '
    volver.innerHTML = 'Volver a la tienda'
    volver.setAttribute('href', 'categorias.html')
    volver.className = 'btn btn-secondary btn-lg'
    carritoVacio.appendChild(br);
    carritoVacio.appendChild(volver);
}

document.addEventListener('DOMContentLoaded', e => {
    pintarCarrito();
});
  