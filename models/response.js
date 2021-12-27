const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    formid: {
        type: mongoose.Schema.ObjectId,
        default: '',
    },
    userid: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now(),
    }
},{strict : false});

const Response = mongoose.model('Response', ResponseSchema);
module.exports = Response