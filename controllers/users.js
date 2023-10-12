const uuid = require('uuid');
const crypto = require('../crypto.js');
const products = require('./products.js');
const mongoose = require('mongoose');
const { to } = require('../tools/to.js');
const UserModel = mongoose.model('UserModel', {userId: String, userName: String, password: String});

const registerUser = async (userName, password) => {
    return new Promise (async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        let newUser = new UserModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        });
        await newUser.save();
        await products.bootstrapProducts(userId);
        resolve();
    })
}

const getUser = (userId) => {
    return new Promise (async (resolve, reject) =>{
        let [err, result] = await to(UserModel.findOne({userId: userId}).exec());
        if (err){
            return reject (err);
        }
        resolve(result);
    })
    
}

const getUserIdFromUserName = (userName) => {
    return new Promise (async (resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({userName: userName}).exec());
        if (err){
            return reject (err);
        }
        resolve(result);
    })
};

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        // Comprobar que las credenciales son correctas
        let user = await getUserIdFromUserName(userName);
        if (user) {
            // Asegúrate de que user.password contenga la contraseña almacenada de forma segura
            crypto.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    reject(err);
                }
                if (isMatch) {
                    resolve(user);
                } else {
                    reject('Invalid password');
                }
            });
        } else {
            reject('User not found');
        }
    });
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;