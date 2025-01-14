const { validationResult } = require("express-validator");
const mapService = require("../services/map-service")

module.exports.getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    try {
        const {address} = req.query;
        const coordinates = await mapService.getAddressCoordinate(address);
        return res.status(200).json(coordinates)
    } catch (error) {
        return res.status(400).json({message : "Internal server error"})
    }
}

module.exports.getDistanceAndTime = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {origin, destination} = req.query;
        const pickupCordinate = await mapService.getAddressCoordinate(origin)
        const destinationCordinate = await mapService.getAddressCoordinate(destination)
        const response = await mapService.getDistanceAndTime(pickupCordinate, destinationCordinate);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message : error})
    }

}

module.exports.getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {input} = req.query;
        const r = "Delhi"
        const delhiCordinate = await mapService.getAddressCoordinate(r)
        const response = await mapService.getAutoCompleteSuggestion(input, delhiCordinate);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message : error})
    }
}