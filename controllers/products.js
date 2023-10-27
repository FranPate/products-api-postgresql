const pool = require('../database.js');

const getProductsOfUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Consulta SQL para obtener un usuario por su userId
            const query = {
              text: 'SELECT name, color, price FROM public."Products" WHERE "userId" = $1',
              values: [user.userId],
            };
        
            // Ejecutar la consulta
            const result = await pool.query(query);
        
            // Si hay resultados, devolver el primer resultado
            if (result.rows.length > 0) {
              return resolve(result.rows);
            } else {
              // Si no hay resultados, devolver null o un objeto vacío según tu preferencia
              return resolve([]);
            }
          } catch (error) {
            return reject(error);
        }
    })
}

const getProduct = async (user, name) => {
    try {
        // Consulta SQL para obtener un usuario por su userId
        const query = {
          text: 'SELECT name, color, price FROM public."Products" WHERE "userId" = $1 AND name = $2',
          values: [user.userId, name],
        };
        // Ejecutar la consulta
        const result = await pool.query(query);
        return Promise.resolve(result.rows);
    } catch (error) {
        return Promise.reject(error);
    }
}

const addProduct = (user, product) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtener los productos del usuario por userId
            const query = {
              text: 'INSERT INTO public."Products" ("userId", name, color, price) VALUES ($1, $2, $3, $4)',
              values: [user.userId, product.name, product.color, product.price],
            };
            await pool.query(query);
            return resolve();

        } catch (error) {
            // Manejar errores
            return reject(error);
        }
    })
}

const setProduct = (user, product, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtener los productos del usuario por userId
            const query = {
            text: 'UPDATE public."Products" SET name=$1, color=$2, price=$3 WHERE "userId" = $4 AND name = $5',
            values: [product.name, product.color, product.price, user.userId, name],
            };
            await pool.query(query);
            return resolve();
        } catch (error) {
            // Manejar errores
            return reject(error);
        }
    })
}

const deleteProduct = (user, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtener los productos del usuario por userId
            const query = {
              text: 'DELETE FROM public."Products" WHERE "userId" = $1 AND name = $2',
              values: [user.userId, name],
            };
            await pool.query(query);
            return resolve();
        } catch (error) {
            // Manejar errores
            return reject(error);
        }
    })
}

exports.addProduct = addProduct;
exports.setProduct = setProduct;
exports.getProductsOfUser = getProductsOfUser;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
