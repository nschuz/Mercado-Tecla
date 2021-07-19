const Sequelize = require('sequelize');
const db = require('./conexion')

const Cliente = db.define('cliente', {
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: Sequelize.STRING,
        defaultValue: "cliente"
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Cliente.sync().then(() => {
    console.log('table created');
});

module.exports = { Cliente }