const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const captainController = require("../controllers/captain-controller")
const authMiddleware = require("../middlewares/auth-middleware")

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be atleast 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be atleast 3 characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be atleast 1 characters long"),
    body("vehicle.vehicleType").isIn(["car", "auto", "motorcycle"]).withMessage("Invalid vehicle type"),
],
    captainController.registerCaptain
)


router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
],
    captainController.loginCaptain
)

router.get("/profile", authMiddleware.authCaptain, captainController.getCpatainProfile)

router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;