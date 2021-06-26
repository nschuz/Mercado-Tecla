const selector = document.querySelector('#sel1');
const boton = document.querySelector('#boton')

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
    }

}