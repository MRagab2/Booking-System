const mongoose = require('mongoose');

const announceSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    privacy: [
        {userID: {
            type: String,
            trim: true
        }}
    ],
    allUsers:{
        type: Boolean,
        default: false
    }
},{timestamps: true});
const Announce = mongoose.model("announces",announceSchema);

module.exports = Announce;