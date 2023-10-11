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
    .put((req, res) => {
        productsController.setProducts(req.body.user, req.body.products);
    })
/*
app.post('/products/:productid', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})

app.get('/products/:productid', (req,res,) => {
    rconsole.log(req);
    res.status(200).send('Hello world')
})

app.delete('/products/:productid', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})

app.put('/products/:productid', () => {
    console.log(req);
    res.status(200).send('Hello world')
})
*/

exports.router = router;