const productsController = require('../controllers/products');
const { getUser } = require('../controllers/users');

const getProductsFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        owner: user.userName,
        products: productsController.getProductsOfUser(req.user.userId)
    })
}

const setProductsToUser = (req, res) => {
    productsController.setProducts(req.user.userId, req.body.products);
    res.status(200).send();
}

const addProductToUser = (req,res) => {
    let product = {
        name: req.body.name,
        color: req.body.color,
        price: req.body.price
    }
productsController.addProduct(req.user.userId, product)
res.status(201).json(product)
}

const getProductFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        product: productsController.getProduct(req.user.userId, req.params.productid)
    })
}

const editProductFromUser = (req, res) => {
    productsController.setProduct(req.user.userId, req.body, req.params.productid);
    res.status(200).send();
}

const deleteProductFromUser = (req, res) => {
    productsController.deleteProduct(req.user.userId, req.params.productid);
    res.status(200).send()
}

exports.getProductsFromUser = getProductsFromUser;
exports.setProductsToUser = setProductsToUser;
exports.addProductToUser = addProductToUser;
exports.getProductFromUser = getProductFromUser;
exports.editProductFromUser = editProductFromUser;
exports.deleteProductFromUser = deleteProductFromUser;