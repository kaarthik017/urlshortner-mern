const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require("dotenv").config();
const app = express()

// Connect to Database
connectDB();

app.use(express.json({extended:false}));
app.use(cors())
// Define Routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("urlfrontend/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'urlfrontend','build','index.html'))
    })
}

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})        