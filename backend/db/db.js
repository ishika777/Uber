const mongoose = require("mongoose")

const coonectToDb = () => {
    mongoose.connect(process.env.DB_CONNECT)
    .then(console.log("db connected"))
    .catch(err => console.log(err))
}
module.exports = coonectToDb;