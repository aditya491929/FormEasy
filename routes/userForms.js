const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const Form = require("../models/form");
const auth = require('../middleware/auth');

router.post("/upload", auth, upload.array("image"), async (req, res) => {
  try {
    const { userId, formCategory, username, description } = req.body;
    console.log(req.body);
    console.log(req.files);
    const form = new Form();
    form.userId = userId;
    form.formCategory = formCategory;
    form.username = username;
    form.description = description;
    form.form = req.files.map((f) => ({ url: f.path, formName: f.formName }));
    await form.save();
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "failed to save form" });
  }
});

module.exports = router;
