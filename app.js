const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    console.log(req);
    res.status(200).send('Hello world')
})

app.post('/products', () => {
    res.status(200).send('Hello world')
})

app.get('/products', () => {
    res.status(200).send('Hello world')
})

app.get('/products/:productid', () => {
    res.status(200).send('Hello world')
})

app.delete('/products/:productid', () => {
    res.status(200).send('Hello world')
})

app.put('/products/:productid', () => {
    res.status(200).send('Hello world')
})

app.listen(port, () => {
    console.log('Server started at port 3000')
})