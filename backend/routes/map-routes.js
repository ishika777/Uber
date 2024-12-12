const express = require("express")
const router = express.Router()
const mapController = require("../controllers/map-controller")
const authMiddleware = require("../middlewares/auth-middleware")
const {query} = require("express-validator")


router.get("/get-coordinates",
    query("address").isString().isLength({min : 3}).withMessage("Location must be atleast characters"),

    authMiddleware.authUser, 
    mapController.getCoordinates)

router.get("/get-distance-time",
    query("origin").isString().isLength({min : 3}).withMessage("Origin must be atleast characters"),
    query("destination").isString().isLength({min : 3}).withMessage("Destination must be atleast characters"),

    authMiddleware.authUser, 
    mapController.getDistanceAndTime)

router.get("/get-suggestions",
    query("input").isString().isLength({min : 3}).withMessage("Origin must be atleast characters"),
    authMiddleware.authUser, 
mapController.getSuggestions)

module.exports = router;