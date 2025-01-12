const mongoose = require('mongoose')
const bcrypt = require('bcrypt')  // It's more common to use bcryptjs in Node.js
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']  // Fixed the message to match the minlength
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,  // Prevents password from being returned in queries
    },
    socketId: {
        type: String,
    }
})

// Method to generate JWT token
userSchema.methods.generateAuth = function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwt_secret, { expiresIn: '1h' })
    return token
}

// Method to compare passwords (using bcrypt.compare)
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Register the model
const userModel = mongoose.model('User', userSchema)

// Export the model
module.exports = userModel
