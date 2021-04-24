const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const jwt_private_key = process.env.JWT_PRIVATE_KEY || '';
// console.log(`JWT Private Key : ${jwt_private_key}`);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

userSchema.plugin(uniqueValidator, {message: '{PATH} already exists'});

userSchema.methods.generateAccessToken = function(){
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, jwt_private_key, { expiresIn: '12h' });
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;