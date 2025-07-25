const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    pickup: {
        type: String,
        required: true,
        minlength: [3, 'Pickup address must be at least 3 characters long']
    },
    dropLocation: {
        type: String,
        required: true,
        minlength: [3, 'Drop location must be at least 3 characters long']
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing' , 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number //in seconds
    },
    distance: {
        type: Number //in meters
    },
    paymentID: {
        type: String
    },
    orderID:{
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: String,
        select: false, // Don't return OTP in queries
        required: true
    }
});


const rideModel = mongoose.model('ride', rideSchema);
module.exports = rideModel;