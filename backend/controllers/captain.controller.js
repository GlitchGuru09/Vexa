const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
    });
    const capToken = captain.generateAuthToken();
    res.status(201).json({ capToken, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const capToken = captain.generateAuthToken();
    res.cookie('capToken', capToken,
        {
        httpOnly: true,      // ✅ keeps it safe from JS
        secure: false,       // ❌ okay in dev, but must be true in production
        sameSite: 'Lax'      // ✅ blocks unwanted cross-site sends
    });

    res.status(200).json({ capToken, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json(captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.capToken || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie('capToken',
        {
        httpOnly: true,      // ✅ keeps it safe from JS
        secure: false,       // ❌ okay in dev, but must be true in production
        sameSite: 'Lax'      // ✅ blocks unwanted cross-site sends
    });

    res.status(200).json({ message: 'Logged out successfully' });
}