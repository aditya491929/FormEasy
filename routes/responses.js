const express = require("express");
const router = express.Router();
const Response = require("../models/response");
const auth = require('../middleware/auth');

router.get('/get/:id', auth, async(req,res) => {
    try{
        const {id} = req.params;
        const response = await Response.find({formid: id})
        res.send({success: true, message: 'Responses Fetched Successfully!', responses: response})
    }catch(err){
        console.log(err)
        res.status(500).send({success: false, message: 'Failed to Fetch Responses!'})
    }
})

module.exports = router