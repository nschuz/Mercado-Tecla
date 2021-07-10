const fetch = require('node-fetch');

const getTrends = async () => {
    const response = await fetch('https://api.mercadolibre.com/trends/MLM')
    const trends = await response.json();
    return trends;
}

const getCategories = async () => {
    const response = await fetch('https://api.mercadolibre.com/sites/MLM/categories')
    const trends = await response.json();
    return trends;
}

const getProducts = async (category) => {
    const response = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=' + category);
    const products = await response.json();
    return products;
}

module.exports = { getTrends, getCategories, getProducts };