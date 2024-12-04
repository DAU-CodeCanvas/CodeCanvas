const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    following: [],
    follower: [],
    projects: []
});

module.exports = mongoose.model('User', userSchema);