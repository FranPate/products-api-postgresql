const mongoose = require('mongoose');

const { required } = require("../const/index");

const ProductsSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, required()],
        },
        products: {
            type: Array
        }
    }
);

module.exports = mongoose.model('Productsmodel', ProductsSchema);