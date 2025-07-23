const axios = require('axios');
const CaptainModel = require('../models/captain.model');



module.exports.getAddressCordinate = async (address) => {

    const apiKey = process.env.GOOGLE_MAPS_API; 
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (
            response.data &&
            response.data.results &&
            response.data.results.length > 0
        ) {
            const location = response.data.results[0].geometry.location;
            // console.log("Google Maps API - Geocode response:", location);
            return { ltd: location.lat, lng: location.lng };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        throw new Error('Error fetching coordinates: ' + error.message);
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        throw new Error('Google Maps API key is not configured');
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        // console.log('Google DistanceMatrix response:', JSON.stringify(response.data, null, 2));
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No distance and time data found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Distance and time not found');
        }
    } catch (error) {
        throw new Error('Error fetching distance and time: ' + error.message);
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input || input.length < 3) {
        throw new Error('querry is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        throw new Error('Google Maps API key is not configured');
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        // console.log(response.data);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('No suggestions found');
        }
    } catch (error) {
        throw new Error('Error fetching suggestions: ' + error.message);
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // console.log(ltd, lng, radius);
    if (!ltd || !lng || !radius) {
        throw new Error('Latitude, longitude, and radius are required');
    }

    const captains = await CaptainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ltd , lng ] , radius / 6371 ] 
            }
        }
    });
    // console.log("Captains in the radius:", captains);
    return captains;
};
