const express = require("express");
const router = express.Router();
const Category = require('../models/category');
const CustomForm = require("../models/customForm");
const Response = require("../models/response");
const auth = require('../middleware/auth');
const url = require('url');
const User = require("../models/user");

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

router.get("/by", async (req, res) => {
  try {
    const { userId } = req.query;
    let user = await User.findById(userId).select('fname lname username email');
    let forms = await CustomForm.find({ userId: userId }).select('formname isAccepting date');
    const responseCounts = forms.map(async (e) => {
      let count = await Response.find({ formid: e._id }).count();
      return count;
    })
    let counts = await Promise.all(responseCounts).then(function (results) {
      return results
    });
    const formData = forms.map((e, index) => {
      return {
        key: e._id,
        id: e._id,
        formname: e.formname,
        date: e.date,
        isAccepting: e.isAccepting,
        responseCount: counts[index].toString()
      };
    });
    const sendData = {
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      forms: formData,
    };
    res.send({ data: sendData, success: true, message: 'Forms fetched successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
})
module.exports = router;
