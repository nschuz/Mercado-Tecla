const URL_CATEGORIAS = `https://api.mercadolibre.com/sites/MLM/categories`
    //Te regresa los productos dependiendo la categoria 
const URL_PRODUCTOS = `https://api.mercadolibre.com/sites/MLM/search?category=`;


const myHeaders = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
});

const fetchConfig = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "no-cache"
};

function fetchData(url) {

    fetch(url, fetchConfig)
        .then(response => {
            return response.json();
        })
        .then(data => {
            productos(data)
        })
        .catch(error => console.error(error));

}


async function productos(data) {
    const productos = data;
    item = productos[Math.floor(Math.random() * productos.length)];
    //console.log(`${URL_PRODUCTOS}${item.id}`)
    const response = await fetch(`${URL_PRODUCTOS}${item.id}`)
    const producto_categoria = await response.json();
    const { results } = producto_categoria
    for (let i = 0; i < 8; i++) {
        const { id, title, price, thumbnail, available_quantity } = results[Math.floor(Math.random() * results.length)]
        insertarProducto(title, price, thumbnail);

    }

}

function insertarProducto(title, price, thumbnail) {
    const row = document.querySelector('#productosNuevos')
    const divPadre = document.createElement('div');
    divPadre.className = 'col-sm-6 col-xl-3';

    const divbox = document.createElement('div');
    divbox.className = "box";
    divPadre.appendChild(divbox);

    const producto = document.createElement('a');
    producto.setAttribute('href', './categorias.html')
    divbox.appendChild(producto);

    const divimg = document.createElement('div');
    divimg.className = 'img-box'
    producto.appendChild(divimg);

    const imagen = document.createElement('img');
    imagen.setAttribute('src', thumbnail)
    divimg.appendChild(imagen);

    const divDetalle = document.createElement('div');
    divDetalle.className = 'detail-box'
    producto.appendChild(divDetalle);

    const nombreProducto = document.createElement('h6');
    nombreProducto.innerHTML = `Nombre: ${title}`;
    divDetalle.appendChild(nombreProducto);

    const precioProducto = document.createElement('h6');
    precioProducto.innerHTML = "Precio: $"
    const precio = document.createElement('span')
    precio.innerHTML = price
    precioProducto.appendChild(precio)
    divDetalle.appendChild(precioProducto);




    const div_new = document.createElement('div')
    div_new.className = "new"
    const nuevo = document.createElement('span')
    nuevo.innerHTML = "new"
    div_new.appendChild(nuevo)
    producto.appendChild(div_new)

    row.appendChild(divPadre)


}


fetchData(URL_CATEGORIAS)