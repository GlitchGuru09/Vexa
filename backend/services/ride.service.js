const rideModel  = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('pickup and destination is required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    console.log(distanceTime);

    const baseFare = {
        auto: 80,
        car: 120,
        motorcycle: 90
    };

    const perKmRate = {
        auto: 12,
        car: 18,
        motorcycle: 8
    };

     const distanceInKm = distanceTime.distance && distanceTime.distance.value
        ? distanceTime.distance.value / 1000
        : 0;
    console.log(distanceInKm);

    const fares = {
        auto: baseFare.auto + perKmRate.auto * distanceInKm,
        car: baseFare.car + perKmRate.car * distanceInKm,
        motorcycle: baseFare.motorcycle + perKmRate.motorcycle * distanceInKm
    };

    console.log(parseFloat(fares.car.toFixed(2)));

    return fares;
}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
    return  otp;
}

module.exports.createRide = async (user, pickup, dropLocation, vehicleType) => {
    if (!user || !pickup || !dropLocation || !vehicleType) {
        throw new Error('User, pickup, dropLocation and vehicleType are required');
    }

    const fare = await getFare(pickup, dropLocation);

    const ride = await rideModel.create({
        user,
        pickup,
        dropLocation,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride
};


