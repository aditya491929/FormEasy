const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    formid: {
        type: mongoose.Schema.ObjectId,
        default: '',
    },
    userid: {
        type: mongoose.Schema.ObjectId,
        default: '',
    },
    response: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

const Response = mongoose.model('Response', ResponseSchema);
module.exports = Response