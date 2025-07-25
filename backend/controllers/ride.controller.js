const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');



module.exports.createRide = async (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    

    try {
        const ride = await rideService.createRide(req.user._id, pickup, destination, vehicleType);
        // console.log(ride)

        res.status(201).json(ride);

        const pickupCoordinates = await mapsService.getAddressCordinate(pickup);
        // console.log("Pickup Coordinates:", pickupCoordinates);

        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2 ); //2 km radius
        // console.log("Captains in radius:", captainsInRadius);

        ride.otp =""

        const rideWithUser = await rideModel.findOne(ride._id).populate('user');

        captainsInRadius.map( captain => {
            // console.log(captain.socketId);

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        return console.log(error);
    }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.query);
    const { pickup, destination } = req.query;
    // console.log(req.query)

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirm',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}