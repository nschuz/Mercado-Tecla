const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');

const Categoria = sequelize.define('categoria', {
    id_categoria: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Categoria.sync().then(() => {
//     console.log('table created');
// });

module.exports = { Categoria }