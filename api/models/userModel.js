const mongoose = require('mongoose');
const valid = require('validator');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        phone2: {
            type: String,
            trim: true
        },
        avatar: {
            type: String,
            default: null,
            trim: true
        },
        token:{
            type: String,
            default: null,
            trim: true
        },
        status: {
            type: String,
            enum: ['active','inactive'],
            default: 'active'
        },
        requestID: {
            type: String,
            default: null,
            trim: true
        },
        reviewID: { //that what he make
            type: String,
            default: null,
            trim: true
        },
        feedbackID: { //that what he got
            type: String,
            default: null,
            trim: true
        },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("users",userSchema);

module.exports = User;