const productsDatabase = {}

const bootstrapProducts = (userId) => {
    return new Promise((resolve, reject) => {
        productsDatabase[userId] = [];
        resolve();
    })
}

const getProductsOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(productsDatabase[userId]);
    })
}

const getProduct = (userId, index) => {
    return new Promise((resolve, reject) => {
        if(!productsDatabase[userId][index]){
            reject();
        } else {
            resolve(productsDatabase[userId][index]);
        }
    })
}

const addProduct = (userId, product) => {
    return new Promise((resolve, reject) => {
        productsDatabase[userId].push(product);
        resolve();
    })
}

const setProducts = (userId, products) => {
    return new Promise((resolve, reject) => {
        productsDatabase[userId] = products;
        resolve();
    })
}

const setProduct = (userId, product, index) => {
    return new Promise((resolve, reject) => {
        if (!productsDatabase[userId][index]){
            reject();
        } else {
            productsDatabase[userId][index] = {};
            productsDatabase[userId][index] = product;
            resolve();
        }
    })
}

const deleteProduct = (userId, index) => {
    return new Promise((resolve, reject) => {
        if(productsDatabase[userId][index]){
            productsDatabase[userId].splice(index, 1);
            resolve();
        }else {
            reject();
        }
    })
}

exports.bootstrapProducts = bootstrapProducts;
exports.addProduct = addProduct;
exports.setProducts = setProducts;
exports.setProduct = setProduct;
exports.getProductsOfUser = getProductsOfUser;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
