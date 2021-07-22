const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexion')

const Contacto = sequelize.define("contacto", {
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
});


module.exports = {
    Contacto
};