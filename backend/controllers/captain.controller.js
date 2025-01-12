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
module.exports.captainLogin = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const Captain = await captain.findOne({ email }).select('+password');
    if (!Captain) {
        return res.status(401).json({ message: " Captain doesn't exist " });
    }
    const match = await Captain.comparePassword(password);
    if (!match) {
        return res.status(401).json({ message: " Incorrect password " });
    }
    const token = Captain.generateAuth();
    res.cookie('token', token);
    return res.status(200).json({ token, Captain });
}
module.exports.captainProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain.id).select('-password');
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        res.json(captain);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
module.exports.captainLogout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Captain logged out successfully.' });
}