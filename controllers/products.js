const productsDatabase = {}

const bootstrapProducts = (userId) => {
    productsDatabase[userId] = []
}

const getProductsOfUser = (userId) => {
    return productsDatabase[userId];
}

const getProduct = (userId, index) => {
    return productsDatabase[userId][index];
}

const addProduct = (userId, product) => {
    productsDatabase[userId].push(product);
}

const setProducts = (userId, products) => {
    productsDatabase[userId] = products;
}

const setProduct = (userId, product, index) => {
    productsDatabase[userId][index] = {};
    productsDatabase[userId][index] = product;
}

const deleteProduct = (userId, index) => {
    if(productsDatabase[userId][index]){
        productsDatabase[userId].splice(index, 1);
    }
}

exports.bootstrapProducts = bootstrapProducts;
exports.addProduct = addProduct;
exports.setProducts = setProducts;
exports.setProduct = setProduct;
exports.getProductsOfUser = getProductsOfUser;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
