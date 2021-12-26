const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const CustomForm = require("../models/customForm");
const Response = require("../models/response");
const User = require('../models/user');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await CustomForm.findOne({ _id: id });
    if (formData.isAccepting) {
      res.send({ data: formData, success: true, message: 'Form accepting responses' });
    } else {
      res.send({ data: formData, success: true, message: 'Form isn\'t accepting responses' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Something went wrong!' })
  }
})

router.post("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, data } = req.body;
    const response = new Response();
    response.formid = id;
    response.userid = userId;
    response.response = data;
    const result = await response.save();
    res.send({ success: true, message: "Response Recorded Successfully!", id: result._id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Something went wrong!' })
  }
})

router.put("/put/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { isAccepting } = req.body;
    let updated = await CustomForm.findOneAndUpdate({ _id: id }, { isAccepting: isAccepting }, { new: true });
    res.send({ success: true, message: "Accepting status changed!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Something went wrong!' })
  }
});

router.delete("/delete/:id", auth, async (req,res) => {
  try{
    const { id } = req.params;
    let form = await CustomForm.findOneAndDelete({_id: id})
    let response = await Response.deleteMany({formid: mongoose.Types.ObjectId(id)})
    if(form.reference.length){
      console.log(form.reference[0].publicId)
      let result = await cloudinary.v2.uploader.destroy(form.reference[0].publicId, resource_type='pdf', function(err,res) {console.log(res,err)})
    }
    res.send({ success: true, message: 'Forms Deleted Successfully!'});
  } catch(err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
})

router.get("/myforms", auth, async (req, res) => {
  try {
    const { userId } = req.query;
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
    res.send({ data: formData, success: true, message: 'Forms fetched successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Something went wrong' });
  }
})

router.put("/favourites", auth, async (req, res) => {
  try {
    const { formId, userId } = req.body;
    let isFav = await User.find({$and: [{id: userId},{ favourites: { $in: [formId] }}]});
    if(isFav.length > 0){
      let fav = await User.findOneAndUpdate({ _id: userId },{ $pull: { favourites: formId } });
      res.send({ data: fav, success: true, message: "Removed From Favorites!"});
    }else{
      let fav = await User.findOneAndUpdate({ _id: userId },{ $push: { favourites: formId } });
      res.send({ data: fav, success: true, message: "Added To Favorites!"});
    }
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
});

router.get("/favourites", auth, async (req, res) => {
  try {
    const { userId } = req.query;
    let fav = await User.findById( userId ).select('favourites');
    console.log(fav);
    res.send({ data: fav, success: true, message: "Favourites fetched successfully!"});
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
});

router.get("/isfavourite", auth, async(req,res) => {
  try {
    const { userId,formId } = req.query;
    let fav = await User.find({$and: [{_id: userId},{ favourites: { $in: [formId] }}]});
    if(fav.length > 0){
      res.send({ data: true, success: true, message: "It is favourite!"});
    } else {
      res.send({ data: false, success: true, message: "It is not favourite!"});
    }
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
})

router.post("/upload", auth, upload.array("image"), async (req, res) => {
  try {
    const { userId, username, formName, formCategory, description } = req.body;
    const form = new CustomForm();
    form.userId = userId;
    form.username = username;
    form.formname = formName;
    form.formCategory = formCategory;
    form.description = description;
    form.reference = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
    const result = await form.save();
    res.send({ success: true, message: "Form Uploaded Successfully!", id: result._id });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Failed To Upload Form!" });
  }
});

module.exports = router;
