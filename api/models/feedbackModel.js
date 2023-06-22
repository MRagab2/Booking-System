const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userID:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        trim:true
    },
} ,{timestamps: true});
const Feedback = mongoose.model("feedbacks",feedbackSchema);

module.exports = Feedback;