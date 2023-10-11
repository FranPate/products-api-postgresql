const productsDatabase = {}

const bootstrapProducts = (userId) => {
    productsDatabase[userId] = [{name: 'Celular'}, {name: 'Televisor'}]
}

const getProductsOfUser = (userId) => {
    return productsDatabase[userId];
}
const addProduct = (userId, productName) => {
    productsDatabase[userId].push({name: productName});
}

const setProducts = (userId, products) => {
    productsDatabase[userId] = products;
}

exports.bootstrapProducts = bootstrapProducts;
exports.addProduct = addProduct;
exports.setProducts = setProducts;
exports.getProductsOfUser = getProductsOfUser;
