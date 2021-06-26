const selector = document.querySelector('#sel1');
const boton = document.querySelector('#boton')
const resultado1 = document.querySelector('#primeraColumna')
const resultado2 = document.querySelector('#segundaColumna')


document.addEventListener('DOMContentLoaded', () => {
    boton.addEventListener('click', buscarProducto);

});



function consultarAPI() {

    const url = `https://api.mercadolibre.com/sites/MLM/categories`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            recorrerJson(data)
            return data
        })
        .catch((err) => console.log(err));
}

consultarAPI();

function recorrerJson(data) {
    for (let i in data) {
        const { id, name } = data[i];
        insertarOption(name, id)
    }
}

function insertarOption(name, id) {
    //console.log(name);
    const datoSelect = document.createElement('option')
    datoSelect.innerHTML = name
    datoSelect.value = id
    const selector = document.querySelector('#sel1');
    selector.appendChild(datoSelect)
}


function buscarProducto(e) {
    limpiarhtml();
    e.preventDefault();
    let sel = document.getElementById("sel1");
    let valor = sel.value;
    consultarProductos(valor);

}

function consultarProductos(valor) {
    const url = `https://api.mercadolibre.com/sites/MLM/search?category=${valor}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            insertarData(data)
        })
        .catch((err) => console.log(err));

}

function insertarData(data) {
    const { results } = data
    console.log(results);
    for (let i = 0; i < 8; i++) {
        const { title, price, thumbnail } = results[i]
        console.log(title);
        console.log(price)
        console.log(thumbnail);
        if (i < 4) {
            construccionCard(title, price, thumbnail, "#primeraColumna")
        } else {
            construccionCard(title, price, thumbnail, "#segundaColumna")
        }
    }

}


function construccionCard(title, price, thumbnail, div) {

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

    const titulo = document.createElement('h5');
    titulo.className = "card-title"
    titulo.innerHTML = title
    divCard_hijo.appendChild(titulo)

    const precio = document.createElement('p');
    precio.className = "card-text"
    precio.innerHTML = `Precio:  $ ${price}`
    divCard_hijo.appendChild(precio)


    const logoCompra = document.createElement('div')
    logoCompra.className = "d-flex justify-content-end"
    divCard_hijo.appendChild(logoCompra)

    const boton = document.createElement('a');
    boton.className = "btn btn-primary"
    boton.innerHTML = `Add <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>`
    logoCompra.appendChild(boton)





    padre.appendChild(divCol);

}


function limpiarhtml() {
    while (resultado1.firstChild && resultado2.firstChild) {
        resultado1.removeChild(resultado1.firstChild);
        resultado2.removeChild(resultado2.firstChild);
    }
}