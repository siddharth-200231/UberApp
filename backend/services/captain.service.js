const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async (captainInfo) => {
    const { fullname, email, password, status, vechile } = captainInfo;
    const { color, plate, vechileType } = vechile;
    if (!fullname || !email || !password || !vechile || !vechile.color || !vechile.plate || !vechile.vechileType) {
        throw new Error('All fields are required');
    }
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCaptain = await captainModel.create({
        fullname,
        email,
        password: hashedPassword,
        status,
        vechile: {
            color,
            plate,
            vechileType
        }
    });
    const token = jwt.sign({ id: newCaptain._id }, process.env.jwt_secret);
    return {
        captain: newCaptain,
        token
    };
};
