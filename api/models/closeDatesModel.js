const mongoose = require('mongoose');

const closeDatesSchema = new mongoose.Schema({
    day:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    time:[{
        startTime: {
            type: String,
            required: true,
            trim: true
        },
        endTime: {
            type: String,
            required: true,
            trim: true
        }
    }]
},{timestamps: true});
const CloseDates = mongoose.model("closeDates",closeDatesSchema);

module.exports = CloseDates;