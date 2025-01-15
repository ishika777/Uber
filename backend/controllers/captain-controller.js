const captainModel = require("../models/captain-model")
const captainService = require("../services/captain-service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken-model")


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {fullname, email, password, vehicle} = req.body;
    
        const isCaptain = await captainModel.findOne({email});
        if(isCaptain){
            return res.status(400).json({message : "Captain already exist"})
        }
    
        const hashedPassword = await captainModel.hashPassword(password)
    
        const captain = await captainService.createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType
        })
    
        const token = captain.generateAuthToken()
    
        return res.status(201).json({token, captain})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {email, password} = req.body;
    
        const captain = await captainModel.findOne({email}).select("+password")
    
        if(!captain){
            return res.status(401).json({message : "Invalid emaill or password"})
        }
        const isMatch = await captain.comparePassword(password);
    
        if(!isMatch){
            return res.status(401).json({message : "Invalid emaill or password"})
        }
    
        const token = captain.generateAuthToken()
    
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict"
        }).json({token, captain})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}

module.exports.getCpatainProfile = async(req, res) => {
    try {
        return res.status(200).json(req.captain)
    } catch (error) {
        return res.status(400).json({message : error})
    }
}

module.exports.logoutCaptain = async(req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        await blacklistTokenModel.create({token})
        // res.clearCookie("token")
    
        res.status(200).cookie("token", "", {maxAge : 0}).json({message : "Logged out"})
    } catch (error) {
        return res.status(400).json({message : error})
    }
}