const axios = require('axios');


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
            console.log(location.lat, location.lng)
            return { ltd: location.lat, lang: location.lng };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        throw new Error('Error fetching coordinates: ' + error.message);
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        return res.status(500).json({ error: 'Google Maps API key is not configured' });
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {

        const response = await axios.get(url);
        console.log(response.data);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                return res.status(404).json({ error: 'No distance and time data found' });
            }
            return response.data.rows[0].elements[0];
        } else {
            return res.status(404).json({ error: 'Distance and time not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching distance and time' });
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
        console.log(response.data);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('No suggestions found');
        }
    } catch (error) {
        throw new Error('Error fetching suggestions: ' + error.message);
    }
}