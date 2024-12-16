const user = require('../models/user')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
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
        return res.status(500).json({ message : error.message })
    }
}
