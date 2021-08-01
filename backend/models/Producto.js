const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const queryInterface = sequelize.getQueryInterface();

const Producto = sequelize.define('producto', {
    id_producto: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING, //Llave foranea
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Producto.sync().then(() => {
//     console.log('table created');
// });

const agregarProductos = async (productos) => {
    for (let i = 0; i < productos.length; i++) {
        const producto = await Producto.findOne({ where: { id_producto: productos[i].id} }) 
        if (!producto) {
            Producto.create({
                id_producto: productos[i].id,
                nombre: productos[i].nombre,
                precio: productos[i].precio,
                descripcion: productos[i].nombre,
                cantidad: 14,
                imagen: productos[i].imagen,
                categoria: 'Otras Categorías'
            }) 
        }
    }
}

const getProductosDisponibles = async () => {
    const productos = await sequelize.query('SELECT * FROM productos WHERE cantidad > 0');
    return productos;
}
module.exports = { Producto, getProductosDisponibles, agregarProductos };