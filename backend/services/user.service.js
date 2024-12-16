const userModel = require('../models/user')
const bcrypt = require('bcrypt')  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken') // Import jsonwebtoken for generating JWT tokens

module.exports.createUser = async ({ fullname, email, password }) => {
    // Check if all fields are provided
    if (!fullname || !email || !password) {
        throw new Error('All fields are required')
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        throw new Error('Email already exists')
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        })
        const token = await newUser.generateAuth()  // Use the generateAuth method from your user schema
        return {
            user:newUser,
            token
        }
    }
}
