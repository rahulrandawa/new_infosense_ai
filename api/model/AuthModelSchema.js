const mongoose = require("mongoose");

const AuthModelSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Minimum 8 character is required']
    },
    image: {
        type: String,
    },

    confirmPassword: {
        type: String,
        minlength: [8, 'Minimum 8 character is required']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const AuthModel = mongoose.model("Auth", AuthModelSchema);
module.exports = AuthModel;