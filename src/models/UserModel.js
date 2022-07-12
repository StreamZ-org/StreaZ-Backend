const mongoose = require('mongoose');


const schema = mongoose.Schema;

const AddressSchema = require('./AddressSchema');
  
var UserSchema = new schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    mob: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
    },
    delivery_address: [
        {type: AddressSchema}
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("User",UserSchema);