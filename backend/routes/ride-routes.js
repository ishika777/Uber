const express = require("express")
const router = express.Router()
const rideController = require("../controllers/ride-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const { body, query } = require("express-validator")


router.post("/create", authMiddleware.authUser,
    body("pickup").isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["car", "auto", "moto"]).withMessage("Invalid vehicle type"),

    rideController.createRide
)


router.get("/get-fare", authMiddleware.authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),

    rideController.getFare
)

router.post("/confirm",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.confirmRide)

    
router.get("/start-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({ min: 6, max: 6 }).withMessage("Invalid otp"),
    rideController.startRide)


router.post("/end-ride",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.endRide)

module.exports = router;