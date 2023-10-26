const mongoose = require('mongoose');

const { required, minLenght, maxLenght } = require("../const/index");

const UserSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, required()],
        },
        userName: {
            type: String,
            required: [true, required()],
            trim: true,
            minLength: [1, minLenght(1)],
            maxLength: [100, maxLenght(40)],
        },
        password: {
            type: String,
            required: [true, required()],
            trim: true,
            minLength: [1, minLenght(1)],
            maxLength: [100, maxLenght(100)],
        }
    }
);

module.exports = mongoose.model('Usermodel', UserSchema);