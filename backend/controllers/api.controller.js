const { response, request } = require('express')
const fetch = require('node-fetch');





const apiCategeoriasGet = (req = request, res = response) => {
    try {
        fetch('https://api.mercadolibre.com/sites/MLM/categories')
            .then(res => res.text())
            .then(body => res.json(JSON.parse(body)));

    } catch (err) {
        console.log(err)
        throw new Error('Problema al consultar a la API')
    }

}

const apiTendenciasGet = (req = request, res = response) => {
    try {
        fetch('https://api.mercadolibre.com/trends/MLM')
            .then(res => res.text())
            .then(body => res.json(JSON.parse(body)));


    } catch (err) {
        console.log(err)
        throw new Error('Problema al consultar a la API')
    }

}

const productosCategoriasGet = (req = request, res = response) => {
    const { id } = req.params;
    console.log(id)

    try {
        fetch(`https://api.mercadolibre.com/sites/MLM/search?category=${id}`)
            .then(res => res.text())
            .then(body => res.json(JSON.parse(body)));


    } catch (err) {
        console.log(err)
        throw new Error('Problema al consultar a la API')
    }

}

const procuctosNombreGet = (req = request, res = response) => {

    const { nombre } = req.params;
    console.log(nombre)

    if (nombre) {
        try {
            fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${nombre}`)
                .then(res => res.text())
                .then(body => res.json(JSON.parse(body)));


        } catch (err) {
            console.log(err)
            throw new Error('Problema al consultar a la API')
        }
    } else {
        return res.status(400).json({
            "error": "El nombre del producto es necesario"
        })
    }
}


const apidefaultGet = (req, res) => {
    res.status(404).json({
        "mensaje": "Recurso no econtrado"
    })
}

const apihomeGet = (req, res) => {
    res.render('apidoc')
}

const apidocGet = (req, res) => {
    res.render('apidoc');
}

//


module.exports = {
    apiCategeoriasGet,
    apiTendenciasGet,
    productosCategoriasGet,
    procuctosNombreGet,
    apidefaultGet,
    apihomeGet,
    apidocGet,


}