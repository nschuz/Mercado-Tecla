const selector = document.querySelector('#sel1');


//document.addEventListener('DOMContentLoaded', () => {
// formulario.addEventListener('submit', validaBusqueda);
//});



function consultarAPI() {

    const url = `https://api.mercadolibre.com/sites/MLA/categories`
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
        insertarOption(name)
    }
}

function insertarOption(name) {
    console.log(name);
}