const mongoose = require('mongoose');
const { to } = require('../tools/to.js');
const ProductsModel = mongoose.model('ProductsModel', {userId: String, products: []});

let productsDatabase = [];

const bootstrapProducts = (userId) => {
    return new Promise(async (resolve, reject) => {
        let newProducts = new ProductsModel({userId: userId, products: []});
        await newProducts.save();
        productsDatabase[userId] = [];
        resolve();
    })
}

const getProductsOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        if (err){
            return reject(err);
        }
        resolve(dbProducts || []);
    })
}

const getProduct = (userId, index) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        if (err){
            return reject(err);
        }
        resolve(dbProducts.products[index]);
    })
}

const addProduct = (userId, product) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        if (err){
            return reject();
        }
        dbProducts.products.push(product)
        await dbProducts.save();
        resolve();
    })
}

/*const setProducts = (userId, products) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        console.log(dbProducts);
        if (err){
            return reject();
        }
        dbProducts.products = products;
        await dbProducts.save();
        resolve();
    });
}*/

const setProduct = (userId, product, index) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        if (err){
            return reject();
        }
            dbProducts.products[index] = product;
            await dbProducts.save();
            resolve();
    })
}

const deleteProduct = (userId, index) => {
    return new Promise(async (resolve, reject) => {
        let [err, dbProducts] = await to(ProductsModel.findOne({userId: userId}).exec());
        if (err){
            return reject();
        }
        if (dbProducts.products[index]){
            dbProducts.products.splice(index, 1);
        }
        await dbProducts.save();
        resolve();
    })
}

exports.bootstrapProducts = bootstrapProducts;
exports.addProduct = addProduct;
/*exports.setProducts = setProducts;*/
exports.setProduct = setProduct;
exports.getProductsOfUser = getProductsOfUser;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
