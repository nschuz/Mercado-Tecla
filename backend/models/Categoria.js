const Sequelize = require('sequelize');
const db = require('./conexion')

const Categoria = db.define('categoria', {
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