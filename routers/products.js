const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

const productsController = require('../controllers/products');
const { getUser } = require('../controllers/users');

router.route('/')
    .get(passport.authenticate('jwt', {session: false}),
        (req, res, next) => {
            let user = getUser(req.user.userId);
            res.status(200).json({
                owner: user.userName,
                products: productsController.getProductsOfUser(req.user.userId)
            })
    })
    .put(passport.authenticate('jwt', {session: false}),
        (req, res) => {
            productsController.setProducts(req.user.userId, req.body.products);
            res.status(200).send();
    })
router.route('/product')
    .post(passport.authenticate('jwt', {session: false}),
        (req,res) => {
            let product = {
                name: req.body.name,
                color: req.body.color,
                price: req.body.price
            }
        productsController.addProduct(req.user.userId, product)
        res.status(201).json(product)
        })

router.route('/product/:productid')
    .get(passport.authenticate('jwt', {session: false}),
        (req, res) => {
            let user = getUser(req.user.userId);
            res.status(200).json({
                product: productsController.getProduct(req.user.userId, req.params.productid)
            })
        })
    .put(passport.authenticate('jwt', {session: false}),
        (req, res) => {
            console.log('req.body')
            productsController.setProduct(req.user.userId, req.body, req.params.productid);
            res.status(200).send();
        })
    .delete(passport.authenticate('jwt', {session: false}),
        (req, res) => {
            productsController.deleteProduct(req.user.userId, req.params.productid);
            res.status(200).send()
        })


exports.router = router;