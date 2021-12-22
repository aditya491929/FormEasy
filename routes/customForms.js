const express = require("express");
const router = express.Router();
const CustomForm = require("../models/customForm");
const auth = require('../middleware/auth');

router.post("/", auth, async (req, res) => {
  try {
    const { userId, username, formName, formCategory, description, formData } = req.body;
    const form = new CustomForm();
    form.userId = userId;
    form.username = username;
    form.formname = formName;
    form.formCategory = formCategory;
    form.description = description;
    form.formData = formData;
    await form.save();
    res.send({ success: true, message: "Form Created Successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Failed To Create Form!" });
  }
});

module.exports = router;
