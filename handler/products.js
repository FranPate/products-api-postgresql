const productsController = require('../controllers/products');
const { getUser } = require('../controllers/users');

const getProductsFromUser = async (req, res) => {
    let user = getUser(req.user.userId);
    let products = await productsController.getProductsOfUser(req.user.userId)
    res.status(200).json({
        owner: user.userName,
        products: products
    })
}

const setProductsToUser = async (req, res) => {
    await productsController.setProducts(req.user.userId, req.body.products);
    res.status(200).send();
}

const addProductToUser = async (req,res) => {
    let product = {
        name: req.body.name,
        color: req.body.color,
        price: req.body.price
    }
    await productsController.addProduct(req.user.userId, product)
    res.status(201).json(product)
}

const getProductFromUser = async (req, res) => {
    let product = await productsController.getProduct(req.user.userId, req.params.productid)
    res.status(200).json({
        product: product
    })
}

const editProductFromUser = async (req, res) => {
    try {
        await productsController.setProduct(req.user.userId, req.body, req.params.productid);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({message: 'No product could be found'})
    }
}

const deleteProductFromUser = async (req, res) => {
    try {
        await productsController.deleteProduct(req.user.userId, req.params.productid);
        res.status(200).send()
    } catch(error) {
        res.status(400).json({message: 'No product could be found'})
    }
    
}

exports.getProductsFromUser = getProductsFromUser;
exports.setProductsToUser = setProductsToUser;
exports.addProductToUser = addProductToUser;
exports.getProductFromUser = getProductFromUser;
exports.editProductFromUser = editProductFromUser;
exports.deleteProductFromUser = deleteProductFromUser;