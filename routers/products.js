const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}),
        (req, res, next) => {
            res.status(200).send('Hello world')
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