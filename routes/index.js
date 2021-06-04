const express = require('express')
const router = express.Router();
const Url = require('../models/url');

//@route GET:/code
//@desc Redirect to long/Original URL
router.get('/:code', async (req,res)=>{
    try {
       
        const url = await Url.findOne({urlCode: req.params.code});
   
        if(url){
            let originalUrl = url.longUrl
            return res.redirect(originalUrl);
        }else{
            return res.status(400).json("No url found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error')
    }
})

router.post("/urllist",async(req,res)=>{
    try{
        const data = await Url.find();
        if(data){
        res.status(200).json(data)
       
        }else{
            res.status(400).json("No data found")
        }
    } catch (error){
        console.log(error);
        res.status(500).json('Server error')
    }
})

module.exports = router