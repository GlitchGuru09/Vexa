const rideModel  = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('pickup and destination is required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

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
    if (!distanceTime?.distance?.value) {
  throw new Error('Distance data missing from mapService response');
}

    const fares = {
        auto: Math.round(baseFare.auto + perKmRate.auto * distanceInKm),
        car: Math.round(baseFare.car + perKmRate.car * distanceInKm),
        motorcycle: Math.round(baseFare.motorcycle + perKmRate.motorcycle * distanceInKm)
    };

    // console.log(fares);
    return fares;
}
module.exports.getFare = getFare;

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


module.exports.confirmRide = async ({rideId, captainId}) => {
    if (!rideId || !captainId) {
        throw new Error('Ride ID and captain ID is required');
    }

    await rideModel.findOneAndUpdate({ _id: rideId },{status: 'accepted', captain: captainId});

    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({rideId, otp}) => {
    if (!rideId || !otp) {
        throw new Error('OTP is required');
    }

    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({ _id: rideId },{status: 'ongoing'});

    // console.log(ride)

    return ride;
}

module.exports.endRide = async({rideId}) => {
    if (!rideId) {
        throw new Error('ride Id and captain Id is required');
    }

    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({ _id: rideId },{status: 'completed'});

    console.log(ride)


    return ride;
}