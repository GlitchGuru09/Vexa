const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }
    try {
        const coordinates = await mapService.getAddressCordinate(address);;
        res.status(200).json(coordinates);

    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' })
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }
    
    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ message: 'Distance and time not found' })
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ error: 'Input is required' });
        }

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
        
    } catch (error) {
        res.status(404).json({ message: error.message || 'Suggestions not found' });
    }
}