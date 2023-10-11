const uuid = require('uuid');
const crypto = require('../crypto.js');
const products = require('./products.js');
const userDatabase = {};

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    // Guardar en la base de datos nuestro usuario
    let userId = uuid.v4();
    userDatabase[userId] = {
        userId: userId,
        userName: userName,
        password: hashedPwd
    }
    products.bootstrapProducts(userId);
}

const getUser = (userId) => {
    return userDatabase[userId];
}

const getUserIdFromUserName = (userName) => {
    for (let userId in userDatabase) {
        if (userDatabase[userId].userName.toLowerCase() === userName.toLowerCase()) {
            return userDatabase[userId];
        }
    }
    return null; // Si no se encuentra el usuario, devuelve null o un valor que indique que no se encontró.
};

const checkUserCredentials = (userName, password, done) => {
    console.log('checking user credentials');
    // Comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if (user) {
        // Asegúrate de que user.password contenga la contraseña almacenada de forma segura
        crypto.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done('Invalid password');
            }
        });
    } else {
        return done('User not found');
    }
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;