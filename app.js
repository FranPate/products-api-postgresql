const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const usersController = require('./controllers/users');
const { number } = require('jsverify');
usersController.registerUser('francisco', '1234');
usersController.registerUser('joan', '4321');

require('./auth')(passport);

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req,res) => {
    //console.log(req);
    res.status(200).send('Hello world')
});

app.post('/login', (req, res) => {
    if(!req.body) {
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'})
    }
    //Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // Si son invalidas ERROR
        if(err || !result){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        // Si son validas, generamos un JWT y los devolvemos
        const token = jwt.sign({userId: result}, 'secretPassword')
        res.status(200).json(
        {token: token}
        )
    })
    
});

app.get('/products', passport.authenticate('jwt', {session: false}),
(req, res, next) => {
    //console.log(req);
    res.status(200).send('Hello world')
})

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

app.listen(port, () => {
    console.log('Server started at port 3000')
})

exports.app = app;