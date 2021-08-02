document.addEventListener('DOMContentLoaded', function() {
    let i = 0;
    if (i == 0) {
        window.location.reload();
        console.log("hola");
        break;
    }
    i++;
})

// import { carrito } from "./models/Carrito.js";

// function carritoInCheckOut() {
//     Object.values(carrito.productos).forEach(producto => {
//         const items = document.getElementById('itemsCheckOut')

//         const tr = document.createElement('tr');
//         items.appendChild(tr);

//         const imgTD = document.createElement('td')
//         const img = document.createElement('img')
//         img.className = "card-img-top imagenCarrito"
//         img.setAttribute("src", producto.imagen)
//         imgTD.appendChild(img)
//         items.appendChild(imgTD)

//         const nombre = document.createElement('td')
//         nombre.innerHTML = producto.nombre
//         items.appendChild(nombre)

//         const cantidad = document.createElement('td')
//         cantidad.innerHTML = producto.cantidad
//         items.appendChild(cantidad)

//         const total = document.createElement('td')
//         let cantidadTotal = 0;
//         cantidadTotal =  producto.precio * producto.cantidad
//         total.innerHTML = '$' + cantidadTotal.toFixed(2);
//         items.appendChild(total);

//         const totalCompra = document.getElementById('total')
//         totalCompra.innerHTML = '$' + carrito.getTotal().toFixed(2);
//      })
// }

// document.addEventListener('DOMContentLoaded', e => {
//       carritoInCheckOut();
//   });