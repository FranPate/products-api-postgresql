const express = require('express');
const router = express.Router();

const productsHttpHandler = require('../handler/products');

router.route('/')
    .get(productsHttpHandler.getProductsFromUser)

router.route('/product')
    .post(productsHttpHandler.addProductToUser)

router.route('/product/:name')
    .get(productsHttpHandler.getProductFromUser)
    .put(productsHttpHandler.editProductFromUser)
    .delete(productsHttpHandler.deleteProductFromUser)


exports.router = router;