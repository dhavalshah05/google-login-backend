const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    googleUserId: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', UserSchema);