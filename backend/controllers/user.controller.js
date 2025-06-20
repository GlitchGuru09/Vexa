const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);
        const { fullname, email, password } = req.body;

        const isUserExists = await userModel.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });
        const userToken = user.generateAuthToken();
        res.status(201).json({ userToken, user });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const userToken = user.generateAuthToken();

    res.cookie('userToken', userToken, {
        httpOnly: true,      // ✅ keeps it safe from JS
        secure: false,       // ❌ okay in dev, but must be true in production
        sameSite: 'Lax'      // ✅ blocks unwanted cross-site sends
    });
    // Your cookie gets set in the browser

    res.status(200).json({ userToken, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await blacklistTokenModel.create({ token });

    res.clearCookie('userToken',
        {
            httpOnly: true,      // ✅ keeps it safe from JS
            secure: false,       // ❌ okay in dev, but must be true in production
            sameSite: 'Lax'      // ✅ blocks unwanted cross-site sends
        });

    res.status(200).json({ message: 'Logged out successfully' });

}