const Sequelize = require('sequelize');
const db = require('./conexion')

const Administrador = db.define('administrador', {
    id_admin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: Sequelize.STRING,
        defaultValue: "administrador"
    },
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Administrador.sync().then(() => {
    console.log('table created');
});

module.exports = { Administrador }