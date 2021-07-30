const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');

const Categoria = sequelize.define('categoria', {
    id_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Categoria.sync().then(() => {
    console.log('table created');
});

module.exports = { Categoria }