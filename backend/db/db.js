require("dotenv").config()
const mongoose = require("mongoose")

const coonectToDb = () => {
    // console.log(p)
    mongoose.connect(process.env.DB_CONNECT)
    .then(console.log("db connected"))
    .catch(err => console.log(err))
}
module.exports = coonectToDb;