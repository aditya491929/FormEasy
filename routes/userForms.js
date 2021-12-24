const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const CustomForm = require("../models/customForm");
const auth = require('../middleware/auth');

router.get("/get/:id", async (req,res) => {
  try{
    const {id} = req.params;
    console.log(req.params)
    const formData = await CustomForm.findOne({ _id: id });
    if(formData.isAccepting){
      res.send({data: formData, success: true, message: 'Form accepting responses'});
    }else{
      res.send({data: formData, success: true, message: 'Form isn\'t accepting responses'})
    }
  }catch(err){
    console.log(err);
    res.status(500).send({success: false, message: 'Something went wrong'})
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
    res.send({ success: true, message: "Form Uploaded Successfully!", id: result._id});
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Failed To Upload Form!" });
  }
});

module.exports = router;
