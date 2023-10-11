const productsDatabase = {}

const bootstrapProducts = (userId) => {
    productsDatabase[userId] = []
}

const getProductsOfUser = (userId) => {
    return productsDatabase[userId];
}
const addProduct = (userId, product) => {
    productsDatabase[userId].push(product);
}

const setProducts = (userId, products) => {
    productsDatabase[userId] = products;
}

exports.bootstrapProducts = bootstrapProducts;
exports.addProduct = addProduct;
exports.setProducts = setProducts;
exports.getProductsOfUser = getProductsOfUser;
