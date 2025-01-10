const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const captainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
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
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vechile: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        vechileType: {
            type: String,
            enum: ['car', 'auto', 'bike'],
            required: true
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }

})

captainSchema.methods.generateAuth = function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwt_secret, { expiresIn: '1h' })
    return token
}
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}
const captainModel = mongoose.model('Captain', captainSchema)


