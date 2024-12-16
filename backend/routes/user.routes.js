const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const controller = require ('../controllers/user.controller.js')
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],controller.userRegister)

module.exports=router