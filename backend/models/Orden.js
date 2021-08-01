const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexion')

const Orden = sequelize.define("orden", {
    id_orden: {
        type: Sequelize.STRING
    },
    id_cliente: {
        type: Sequelize.STRING
    },
    id_pago: {
        type: Sequelize.STRING
    },
    id_direccion: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Orden.sync().then(() => {
//     console.log('table created');
// });

const generarOrden = (id_orden, id_cliente, id_pago, id_direccion) => {
    try {
        Orden.create({ 
            id_orden,
            id_cliente,
            id_pago,
            id_direccion
        })
    }catch(err) {
        throw new Error('No se genero la orden')
    }
}

module.exports = {
    Orden,
    generarOrden
};