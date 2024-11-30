const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [5, 'Name must be at least 5 characters long'],
    },

    lastname: {
        type: String,
        required: true,
        minlength: [3, 'last name must be at least 3 characters long'],
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Email must be at least 6 characters long'],
    },

    password: {
        type: String,
        required: true,
        Select: false
    },

    socketId: {
      type: String
    }

})

userSchema.method.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel