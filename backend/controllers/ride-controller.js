const rideModel = require("../models/ride-model")
const rideService = require("../services/ride-service")
const mapService = require("../services/map-service")
const { validationResult } = require("express-validator")
const { sendMessageToSocketId } = require("../socket")

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {pickup, destination, vehicleType} = req.body
    try {

        const ride = await rideService.createRide({user : req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride)

        const pickupCordinate = await mapService.getAddressCoordinate(pickup)
        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCordinate.lat, pickupCordinate.lng, 100) //100km radius
        ride.otp = ""

        const rideWithUser = await rideModel.findOne({_id : ride._id}).populate("user")

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event : "new-ride",
                data : rideWithUser
            })
        })

    } catch (error) {
        return res.status(400).json({errors : error.message})
    }
}

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {pickup, destination} = req.query
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(201).json(fare)
    } catch (error) {
        return res.status(400).json({errors : error.message})
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {rideId} = req.body
    try {
        const ride = await rideService.confirmRide({rideId, captain : req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event : "ride-confirmed",
            data : ride
        })

        return res.status(201).json(ride)
    } catch (error) {
        return res.status(400).json({errors : error.message})
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {rideId, otp} = req.query
    try {
        const ride = await rideService.startRide({rideId, otp, captain : req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event : "ride-started",
            data : ride
        })
        
        return res.status(201).json(ride)
       
    } catch (error) {
        return res.status(400).json({errors : error.message})
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {rideId} = req.body
    try {
        const ride = await rideService.endRide({rideId, captain : req.captain});

        console.log(ride)

        sendMessageToSocketId(ride.user.socketId, {
            event : "ride-ended",
            data : ride
        })
        
        return res.status(200).json(ride)
       
    } catch (error) {
        return res.status(400).json({errors : error.message})
    }
}
