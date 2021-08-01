const { Sequelize } = require('sequelize');
const sequelize = require('../db/conexion');

const Pago = sequelize.define("pago", {
    id_pago: {
        type: Sequelize.STRING,
    },
    id_cliente: {
        type: Sequelize.STRING
    },
    card_number: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Pago.sync().then(() => {
    console.log('table created');
});

const generarCobro = (id_pago, tarjeta, id_cliente) => {
    try {
        Pago.create({ 
            id_pago,
            id_cliente,
            card_number: tarjeta.numTarjeta
        })
    }catch(err) {
        throw new Error('No se genero el cobro')
    }
}

module.exports = {
    Pago,
    generarCobro
};