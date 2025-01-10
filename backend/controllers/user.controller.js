const user = require('../models/user')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const jwt = require('jsonwebtoken')
module.exports.userRegister = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    try {
        const createdUser = await userService.createUser(req.body)
        return res.status(201).json({
            message: 'User registered successfully',
            token: createdUser.token,
            user: {
                id: createdUser.user.id,
                fullname: createdUser.user.fullname,
                email: createdUser.user.email
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
module.exports.userLogin = async (req, res, next) => {
    const errors = validationResult(req)
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const User = await user.findOne({ email }).select('+password')
    if (!User) {
        return res.status(401).json({ message: " User doesn't exist " })
    }
    const match = await User.comparePassword(password)
    if (!match) {
        return res.status(401).json({ message: " Incorrect password " })
    }
    const token = User.generateAuth()
    res.cookie('token', token)
    return res.status(200).json({ token, User })
}
module.exports.userProfile = async (req, res, next) => {
    return res.status(200).json({ user: req.user })
}

module.exports.userLogout = async (req, res, next) => {
    console.log('Logging out')
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully.' });
}