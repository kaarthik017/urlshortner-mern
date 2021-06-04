const express = require('express')
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
require('dotenv').config();
const Url = require('../models/url');

//POST /api/url/shorten
//@desc Create Shorten URL
router.post('/shorten', async(req,res)=>{
    
    const longUrl = req.body.url;
  
    const baseUrl= process.env.BASE_URL;
    if(!validUrl.isUri(baseUrl)){
        res.status(401).json({
            message:"Invalid BaseUrl"
        })
    }

    // Create short url code
    const urlCode = shortid.generate();

    // Check long url code
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});
            if(url){
                res.json(url)
            }else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date: new Date()
                });

                url.save();

                res.json({
                    message : "Url Shorten",
                    url})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:"Server Error"
            })
        }
    }else{
        res.status(401).json({
            message:"Invalid Long URL"
        })
    }
})

router.post('/click', async (req,res)=>{
    try {
        let shortUrl = req.body.shortUrl
    
        let data = await Url.findOne({shortUrl});    
        if(data){
            
            await Url.findOneAndUpdate({shortUrl},{ $inc: { clicks: 1}})
            let allData = await Url.find();
            res.status(200).json({allData})
        }else{
            res.status(400).json({
                message:"No Shorturl Found"
            })
        }
    } catch (error) {
        res.json({message:"No data found"})
    }
})
module.exports = router