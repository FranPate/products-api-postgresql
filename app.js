const express = require('express');
const middlewares = require('./middlewares')
require('./database')
// Routes
const authRoutes = require('./routers/auth').router;
const productsRoutes = require('./routers/products').router;


const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req,res) => {
    res.status(200).send('Hello world')
});
app.use('/auth', authRoutes)
app.use('/products', productsRoutes)

app.listen(port, () => {
    console.log('Server started at port 3000')
})

exports.app = app;