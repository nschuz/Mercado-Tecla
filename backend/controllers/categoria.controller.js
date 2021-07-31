const { Categoria } = require('../models/Categoria');

/* Funciones para la API */
const createCategoria = async(req, res) => {
    const { id_categoria, nombre} = req.body;
    try {
        const categoria = await Categoria.create({
            id_categoria,
            nombre            
        })
        res.status(201).json(categoria);

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

const readCategoria = async(req, res) => {
    try {
        const categoria = await Categoria.findAll();
        res.status(200).json(categoria);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

const readUnaCategoria = async(req, res) => {
    const id_categoria = req.params.id
    try {
        const categoria = await Categoria.findAll({ where: { id_categoria }});
        res.status(200).json(categoria);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

module.exports = {
    createCategoria,
    readCategoria,
    readUnaCategoria,

}