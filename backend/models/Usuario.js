const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion')



const Usuario = sequelize.define("usuario", {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_unico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },

    tipo_usuario: {
        type: Sequelize.STRING,
        defaultValue: "cliente"
    },

    activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },


});




module.exports = {
    Usuario
};