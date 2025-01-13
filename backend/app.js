const dotenv = require("dotenv")
dotenv.config({ path: '../.env' })
const express = require("express")
const app = express()
const cors = require("cors")
const connectToDb = require("./db/db")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/user-routes")
const captainRoutes = require("./routes/captain-routes")
const mapRoutes = require("./routes/map-routes")
const rideRoutes = require("./routes/ride-routes")
const path = require("path")

connectToDb()

const _dirname = path.resolve()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


app.use("/users", userRoutes)
app.use("/captains", captainRoutes)
app.use("/maps", mapRoutes)
app.use("/rides", rideRoutes)

app.use(express.static(path.join(_dirname, "frontend/dist")))

app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


module.exports = app;