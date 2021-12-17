const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
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

const Form = mongoose.model('Form', FormSchema);
module.exports = Form