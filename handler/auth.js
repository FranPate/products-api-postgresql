const jwt = require('jsonwebtoken');
const {to} = require('../tools/to');
//Controllers
const usersController = require('../controllers/users');

const createUser = async (req, res) => {
    console.log(req.body);
    await usersController.registerUser(req.body.user, req.body.password);
    res.status(200).json({message: 'User Created'});
}


const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Comprobamos credenciales
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password));
    // Si no son validas, error
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    // Si son validas, generamos un JWT y lo devolvemos
    let userId = await usersController.getUserIdFromUserName(req.body.user);
    const token = jwt.sign({userId: userId}, 'secretPassword');
    res.status(200).json(
        {token: token}
    )
}

exports.loginUser = loginUser;
exports.createUser = createUser;