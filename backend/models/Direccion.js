const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');

const Direccion = sequelize.define('direccion', {
    id_direccion: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    id_cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    calle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    colonia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    municipio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

const agregarDireccion = (id_direccion, direccion, uid) => {
    try {
        Direccion.create({
            id_direccion, 
            id_cliente: uid,
            calle: direccion.calle,
            colonia: direccion.colonia,
            municipio: direccion.municipio,
            estado: direccion.estado
        })
        return id_direccion;
    } catch (err) {
        throw new Error('Direccion no agregada')
    }
}

// Direccion.sync().then(() => {
//     console.log('table created');
// });

module.exports = { Direccion, agregarDireccion }