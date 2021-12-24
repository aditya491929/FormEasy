const express = require("express");
const router = express.Router();
const Category = require('../models/category');
const CustomForm = require("../models/customForm");
const auth = require('../middleware/auth');
const url = require('url');

router.get('/categories', auth, async (req,res) => {
    const data = await Category.find({});
    res.send(data)
})

router.get("/search", async (req,res) => {
    try{
      const { key } = url.parse(req.url, true).query;
      console.log(key);
      const formData = await CustomForm.find({
        $or: [ {formname : { $regex: key, $options: 'i' }}, { description: { $regex: key, $options: 'i' } } ]
      });
      if(formData.length){
        res.send({data: formData, success: true, message: 'Search results fetched successfully!'});
      } else {
        res.send({data: formData, success: true, message: 'No search results!'});
      }
    } catch(err) {
      console.error(err);
      res.status(500).send({success: false, message: 'Something went wrong'});
    }
})

module.exports = router;
