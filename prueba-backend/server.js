const express = require('express');
const app = express();
require('dotenv').config();
const { getTrends, getCategories, getProducts } = require('./ml.services');
const { corsOption } = require('./middlewares/index')

const cors = require('cors');

//Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Levantamos el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
})

app.get('/', async (req, res) => {
    const products = await getProducts();
    return products;
})

app.get('/trends', cors(corsOption), async (req, res) => {
    try {
        const trends = await getTrends();
        res.status(200).json(trends);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})

app.get('/categories', cors(corsOption), async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})

app.get('/products/:category', async (req, res) => {
    const category = req.params.category
    try {
        const products = await getProducts(category);
        res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})

/*
//Endpoint te regresa 50 tendencias
const URL_TENDENCIAS = `http://localhost:3000/trends`;
//Te regresa todas la categorias de mercado libre
const URL_CATEGORIAS = `http://localhost:3000/categories`
    //Te regresa los productos dependiendo la categoria 
const URL_PRODUCTOS = `http://localhost:3000/products/`;
*/