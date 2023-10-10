const express = require('express');
const app = express();
const port = 3000;

/*app.get('/', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})*/

app.post('/products', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})

app.get('/products', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})

app.get('/products/:productid', (req,res) => {
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

app.listen(port, () => {
    console.log('Server started at port 3000')
})

exports.app = app;