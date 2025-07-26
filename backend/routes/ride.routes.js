const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');

router.post('/create', 
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address.'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    authMiddleware.isLoggedIn,rideController.createRide
)

router.get('/get-fare',
    authMiddleware.isLoggedIn,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address.'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid destination address.'),
    rideController.getFare
)

router.post('/confirm',authMiddleware.isLoggedInCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
)

router.get('/start-ride',authMiddleware.isLoggedInCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride ID'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',authMiddleware.isLoggedInCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id.'),
    rideController.endRide
)

module.exports = router;