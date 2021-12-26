const mongoose = require('mongoose');

const CustomFormSchema = new mongoose.Schema({
    reference:[
        {
            url: String,
            publicId: String
        }
    ],
    formData:{
      type: String,
      default: ''
    },
    formname:{
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.ObjectId,
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
    isAccepting: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const CustomForm = mongoose.model('Customform', CustomFormSchema);
module.exports = CustomForm