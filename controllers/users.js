const uuid = require('uuid');
const crypto = require('../crypto.js');
const pool = require('../database.js');

const registerUser = async (userName, password) => {
    return new Promise (async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        const query = {
            text: 'INSERT INTO  public."Users"("userId", "userName", password) VALUES($1, $2, $3)',
            values: [userId, userName, hashedPwd]
        };
        // Ejecutar la consulta
        await pool.query(query);
        resolve();
    })
}

const getUser = async (userId) => {
    try {
        // Consulta SQL para obtener un usuario por su userId
        const query = {
          text: 'SELECT * FROM public."Users" WHERE "userId" = $1',
          values: [userId],
        };
    
        // Ejecutar la consulta
        const result = await pool.query(query);
    
        // Si hay resultados, devolver el primer resultado
        if (result.rows.length > 0) {
          return Promise.resolve(result.rows[0]);
        } else {
          // Si no hay resultados, devolver null o un objeto vacío según tu preferencia
          return Promise.resolve(null); // o Promise.resolve({}) si quieres devolver un objeto vacío
        }
      } catch (error) {
        return Promise.reject(error);
      } 
}

const getUserIdFromUserName = (userName) => {
    return new Promise (async (resolve, reject) => {
        try {
            // Consulta SQL para obtener el userId por el userName
            const query = {
              text: 'SELECT * FROM public."Users" WHERE "userName" = $1',
              values: [userName],
            };
        
            // Ejecutar la consulta
            const result = await pool.query(query);
        
            // Si hay resultados, devolver el userId
            if (result.rows.length > 0) {
              return resolve(result.rows[0]);
            } else {
              // Si no hay resultados, devolver null o lanzar un error según tu preferencia
              return resolve(null); // o Promise.reject(new Error('Usuario no encontrado'))
            }
        } catch (error) {
            return reject(error);
        }
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