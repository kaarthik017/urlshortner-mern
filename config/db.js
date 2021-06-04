const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config()
const db = process.env.DATABASE_ACCESS
const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useFindAndModify: false
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;
