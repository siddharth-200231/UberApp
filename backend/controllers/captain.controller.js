const captain = require('../models/captain.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');

module.exports.captainRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const createdCaptain = await captainService.createCaptain(req.body);
        return res.status(201).json({
            message: 'Captain registered successfully',
            token: createdCaptain.token,
            captain: {
                id: createdCaptain.captain.id,
                fullname: createdCaptain.captain.fullname,
                email: createdCaptain.captain.email,
                vechile: createdCaptain.captain.vechile
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}