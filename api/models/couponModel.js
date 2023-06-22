const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        default: null,
        trim: true
    },
    discount: {
        type: Number,
        default: 0,
    },
    expirationDate: {
        type: Date,
        default: null,
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
});

const Coupon = mongoose.model("coupons",couponSchema);

module.exports = Coupon;