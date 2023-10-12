const jwt = require('jsonwebtoken')
//Controllers
const usersController = require('../controllers/users');
usersController.registerUser('francisco', '1234');
usersController.registerUser('joan', '4321');


const loginUser = (req, res) => {
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
        let user = usersController.getUserIdFromUserName(req.body.user);
        const token = jwt.sign({userId: user.userId, userName: user.userName}, 'secretPassword');
        res.status(200).json(
        {token: token}
        )
    })
}

exports.loginUser = loginUser;