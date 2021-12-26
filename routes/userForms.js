const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const CustomForm = require("../models/customForm");
const Response = require("../models/response");
const auth = require('../middleware/auth');
const User = require("../models/user");

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

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { userId } = req.query;
    let forms = await CustomForm.findOneAndDelete()
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


router.post("/favourites", auth, async (req, res) => {
  try {
    const { formId, userId } = req.body;
    let fav = await User.findOneAndUpdate({ _id: userId },{ $push: { favourites: formId } });
    res.send({ data: fav, success: true, message: "Added to Favourites!"});
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
});

router.get("/favourites", auth, async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log(userId);
    let fav = await User.find({ _id: userId }).select('favourites');
    console.log(fav);
    res.send({ data: fav, success: true, message: "Favourites fetched successfully!"});
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong"});
  }
});

router.get("/isfavourite", auth, async(req,res) => {
  try {
    const { userId,formId } = req.query;
    let fav = await User.find({$and: [{id: userId},{ favourites: { $in: [formId] }}]});
    console.log(fav);
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
    const { userId, username, formName, formCategory, description, visibility } = req.body;
    const form = new CustomForm();
    form.userId = userId;
    form.username = username;
    form.formname = formName;
    form.formCategory = formCategory;
    form.isAccepting = visibility;
    form.description = description;
    form.reference = req.files.map((f) => ({ url: f.path }));
    const result = await form.save();
    res.send({ success: true, message: "Form Uploaded Successfully!", id: result._id });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Failed To Upload Form!" });
  }
});

module.exports = router;
