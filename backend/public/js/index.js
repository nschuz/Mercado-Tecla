import { carrito } from "./models/Carrito.js";

const boton = document.querySelector('#boton')

//Endpoints
//Endpoint te regresa 50 tendencias
const URL_TENDENCIAS = `https://api-mercado-tecla.herokuapp.com/api/tendencias`;
//Te regresa todas la categorias de mercado libre
//`https://api.mercadolibre.com/sites/MLM/categories`
const URL_CATEGORIAS = `https://api-mercado-tecla.herokuapp.com/api/categorias`
    //Te regresa los productos dependiendo la categoria 
    //https://api-mercado-tecla.herokuapp.com/api/productos-categoria/
    //`https://api.mercadolibre.com/sites/MLM/search?category=`
const URL_PRODUCTOS = `https://api-mercado-tecla.herokuapp.com/api/productos-categoria/`;

//consultamos las 10 tendencias y las categorias
consultarAPI(URL_TENDENCIAS, insertarTendencias)
consultarAPI(URL_CATEGORIAS, insertarOption)

document.addEventListener('DOMContentLoaded', () => {
    boton.addEventListener('click', buscarProducto);
});

//Cors
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


//Funcion que consulta la api usando fetch
function consultarAPI(url, callback, valor_defecto = null, fetchConfig) {
    if (valor_defecto != null) {
        url = url + valor_defecto;
        console.log(url);
    }
    fetch(url, fetchConfig)
        .then((res) => res.json())
        .then(data => {
            callback(data)
        })
        .catch(err => console.log(err));
}

//Inserta las top 10 tendencias de mercado libre
function insertarTendencias(data) {
    let derecha = document.querySelector('#tendencia1')
    let izquierda = document.querySelector('#tendencia2')
    for (let i = 0; i < 10; i++) {
        let { keyword, url } = data[i]
        let ancla = document.createElement('a');
        ancla.className = 'list-group-item list-group-item-action"'
        ancla.setAttribute("href", url)
        ancla.innerHTML = `${i+1}. ${keyword}`
        if (i < 5) {
            derecha.appendChild(ancla)
        } else {
            izquierda.appendChild(ancla)
        }
    }

}

//Cargamos las tendencias en los options dentro del select 
function insertarOption(data) {
    console.log(data)
    for (let i in data) {
        const { id, name, } = data[i];
        const datoSelect = document.createElement('option')
        datoSelect.innerHTML = name
        datoSelect.value = id
        const selector = document.querySelector('#sel1');
        selector.appendChild(datoSelect)
    }
}

//Obtenemos el valir del select  y consulta la Api cuando presionamos el boton
function buscarProducto(e) {
    limpiarhtml();
    e.preventDefault();
    let sel = document.getElementById("sel1");
    let valor = sel.value;
    consultarAPI(URL_PRODUCTOS, insertarData, valor);

}


//Etsan funcion recorre el json con los 12 mejores productos dependiendo la catehorias
function insertarData(data) {
    console.log('Data: ', data);
    const { results } = data
    console.log(results);
    let i = 0
    while (i < 12) {
        let random = getRandomArbitrary(0, 49);
        const { id, title, price, thumbnail, available_quantity } = results[random]
        if (i < 4) {
            construccionCard(id, title, price, thumbnail, available_quantity, "#primeraColumna")
        } else if (i >= 4 && i < 8) {
            construccionCard(id, title, price, thumbnail, available_quantity, "#segundaColumna")
        } else {
            construccionCard(id, title, price, thumbnail, available_quantity, "#terceraColumna ")
        }
        i++;
    }
}

//Esta funcion permite construir un card 
function construccionCard(id, title, price, thumbnail, available_quantity, div) {
    const padre = document.querySelector(div)

    const divCol = document.createElement('div');
    divCol.className = "col"

    const divCard = document.createElement('div');
    divCard.className = "card"
    divCol.appendChild(divCard)
    divCard.setAttribute("style", "width: 16 rem;")


    const img = document.createElement('img')
    img.className = "card-img-top"
    img.setAttribute("src", thumbnail)
    divCard.appendChild(img)

    const divCard_hijo = document.createElement('div');
    divCard_hijo.className = "card-body"
    divCard.appendChild(divCard_hijo)

    const titulo = document.createElement('h6');
    titulo.className = "card-subtitle mb-2 "
    titulo.innerHTML = title
    divCard_hijo.appendChild(titulo)

    const precio = document.createElement('p');
    precio.className = "card-text"
    precio.innerHTML = `Precio:  $ ${price}`
    divCard_hijo.appendChild(precio)

    const cantidad = document.createElement('p');
    cantidad.className = "card-text"
    cantidad.innerHTML = `Cantidad: ${available_quantity}`
    divCard_hijo.appendChild(cantidad)


    const logoCompra = document.createElement('div')
    logoCompra.className = "d-flex justify-content-end"
    divCard_hijo.appendChild(logoCompra)

    const boton = document.createElement('button');
    boton.className = "btn btn-primary"
    boton.innerHTML = `Add <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>`
    boton.addEventListener('click', e => { carrito.addProducto(e, id, title, price, thumbnail) })
    logoCompra.appendChild(boton)
    padre.appendChild(divCol);
}

//cada vezz que presionamos el boton limpiamos los productos 
function limpiarhtml() {
    const resultado1 = document.querySelector('#primeraColumna')
    const resultado2 = document.querySelector('#segundaColumna')
    const resultado3 = document.querySelector('#terceraColumna')
    while (resultado1.firstChild && resultado2.firstChild && resultado3.firstChild) {
        resultado1.removeChild(resultado1.firstChild);
        resultado2.removeChild(resultado2.firstChild);
        resultado3.removeChild(resultado3.firstChild);
    }
}

//Funcion que genera un numero random
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}