const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const Form = require("../models/form");
const auth = require('../middleware/auth');

router.post("/upload", auth, upload.array("image"), async (req, res) => {
  try {
    const { userId, username, formName, formCategory, description } = req.body;
    const form = new Form();
    form.userId = userId;
    form.username = username;
    form.formname = formName;
    form.formCategory = formCategory;
    form.description = description;
    form.form = req.files.map((f) => ({ url: f.path }));
    await form.save();
    res.send({ success: true, message: "Form Uploaded Successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Failed To Upload Form!" });
  }
});

module.exports = router;
