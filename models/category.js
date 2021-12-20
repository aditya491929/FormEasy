const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    url: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category