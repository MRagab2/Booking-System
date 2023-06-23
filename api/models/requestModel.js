const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: String,
        required: true,
        trim: true
    },
    endTime: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    couponID:{
        type: String,
        default: null,
        trim: true
    },
    status:{
        type: String,
        enum: ['fresh','closed','done','canceled'],
        default: 'fresh'
    },
    userID: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    userAvatar: {
        type: String,
        trim: true,
        required: true
    },

},{timestamps: true});
const Request = mongoose.model("requests",requestSchema);

module.exports = Request;