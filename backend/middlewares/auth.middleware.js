const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.authUser = async (req, res, next) => {
    // Get token from cookie or header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1])
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        // Verify token and find user
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const user = await userModel.findById(decoded._id)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}