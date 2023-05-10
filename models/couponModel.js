const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    Code:{
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
    privacy: [
        {userID: {
            type: String,
            trim: true
        }}
    ],
    expirationDate: {
        type: Date,
        default: null,
        trim: true
    }
});

const Coupon = mongoose.model("coupons",couponSchema);

module.exports = Coupon;