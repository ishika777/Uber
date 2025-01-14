const userModel = require("../models/user-model")
const userService = require("../services/user-service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken-model")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {fullname, email, password} = req.body;
    
        const isUser = await userModel.findOne({email});
        if(isUser){
            return res.status(400).json({message : "User already exist"})
        }
    
        const hashedPassword = await userModel.hashPassword(password)
    
        const user = await userService.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword
        })
    
        const token = user.generateAuthToken()
    
        return res.status(201).json({token, user})
    } catch (error) {
        return res.status(400).json({message : error})
    }

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            return res.status(401).json({message : "Invalid emaill or password"})
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid emaill or password"})
        }
        const token = user.generateAuthToken()
        res.cookie("token", token, {
                httpOnly : true,
                maxAge : 3600000
        })
        return res.status(200).json({token, user})
    } catch (error) {
        return res.status(400).json({message : error})
    }

}

module.exports.getUserProfile = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        return res.status(400).json({message : error})
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        await blacklistTokenModel.create({token})
        res.clearCookie("token")
    
        res.status(200).json({message : "Logged out"})
    } catch (error) {
        return res.status(400).json({message : error})
    }

}