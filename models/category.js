const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    form:[
        {
            url: String,
            formName: String,
        }
    ],
    userId: {
        type: String,
        default: '',
    },
    formCategory: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category