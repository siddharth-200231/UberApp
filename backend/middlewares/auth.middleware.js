const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captainModel = require('../models/captain.model')
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1])
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const user = await userModel.findById(decoded._id)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1])
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

}