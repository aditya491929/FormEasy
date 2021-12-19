const express = require("express");
const router = express.Router();
const Category = require('../models/category');
const auth = require('../middleware/auth');

router.get('/categories', auth, async (req,res) => {
    const data = await Category.find({});
    res.send(data)
})

module.exports = router;
