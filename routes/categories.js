const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const CustomForm = require("../models/customForm");
const url = require("url");

//Get Category Cards
router.get("/categories", async (req, res) => {
  const data = await Category.find({});
  res.send(data);
});

//Get Forms in a Category
router.get("/categories/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const categoryCard = await Category.find({ name: category });
    const data = await CustomForm.find({ formCategory: category });
    res.send({
      success: true,
      message: "Data Fetched Successfully",
      card: categoryCard,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.append
      .status(500)
      .send({ success: false, message: "Something Went Wrong!" });
  }
});

//Search Forms
router.get("/search", async (req, res) => {
  try {
    const { key } = url.parse(req.url, true).query;
    const formData = await CustomForm.find({
      $or: [
        { formname: { $regex: key, $options: "i" } },
        { description: { $regex: key, $options: "i" } },
        { username: { $regex: key, $options: "i" } },
      ],
    });
    if (formData.length) {
      res.send({
        data: formData,
        success: true,
        message: "Search results fetched successfully!",
      });
    } else {
      res.send({
        data: formData,
        success: true,
        message: "No search results!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
