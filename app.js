const express = require('express');
const middlewares = require('./middlewares');
const { Pool } = require('pg');
// Routes
const authRoutes = require('./routers/auth').router;
const productsRoutes = require('./routers/products').router;

const app = express();

const pool = new Pool({
    user: 'test', // Nombre de usuario de PostgreSQL
    host: 'localhost', // Host de la base de datos
    database: 'Users', // Nombre de la base de datos
    password: 'test', // Contraseña de PostgreSQL
    port: 5432, // Puerto de PostgreSQL (por defecto es 5432)
});

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