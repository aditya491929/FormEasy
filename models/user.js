const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: '',
    },
})

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        default: '',
    },
    lname: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    authStrategy: {
        type: String,
        default: 'local',
    },
    refreshToken: {
        type: [Session],
    },
});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema);

module.exports = User