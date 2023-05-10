const express = require('express');
const router = express.Router();

const userConroller = require('../controllers/userController');
const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Review = require("../models/reviewModel");


router.get('/reviews', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviews = await Review.find().sort({
            createdAt:1
        });
        
        res.status(200).send(reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/accepted', 
    // authenticate, 
    async(req,res)=>{
    try{
        let reviews = await Review.find({
            status:'unhidden'
        }).sort({
            createdAt:1
        });

        let usersReviews = [];
        Promise.all(reviews.map(async review => {
            let {
                _id,
                fullName,
                email,
                phone,
                avatar,
                requestID,
                reviewID,
                feedbackID,
                createdAt,
            } = await User.findOne({
                _id: review.userID
            });
            let user={
                _id,
                fullName,
                email,
                phone,
                avatar,
                requestID,
                reviewID,
                feedbackID,
                createdAt,
            };

            usersReviews.push({
                review,
                user
            });
        })).then(() => {
            res.status(200).send(usersReviews);
        }).catch(error => {
            onsole.log(err);
            res.status(400).send(err.message);
        });
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/hidden', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviews = await Review.find({
            status:'hidden'
        }).sort({
            createdAt:1
        });
        
        res.status(200).send(reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/pending', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviews = await Review.find({
            status:'pending'
        }).sort({
            createdAt:1
        });
        
        res.status(200).send(reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/:id', 
    authenticate, 
    async(req,res)=>{
    try{
        let review = await Review.findOne({_id: req.params.id});
        
        res.status(200).send(review);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.post('/', 
    authenticate, 
    async(req,res)=>{
    try{
        let requestID = req.body.requestID;
        let userID = req.body.userID;

        let check = await Review.findOne({
            $or:[
                {userID: userID},
                {requestID: requestID},
            ]
        });

        if(check) return res.status(400).send('Request Already Reviewd');
        
        let review = new Review({
            userID: userID,
            requestID: requestID,
            rate: req.body.rate,
            review: req.body.review
        });

        let userCheck = await User.findOne({
            _id: req.body.userID,
        });
        let requestCheck = await Request.findOne({
            _id: req.body.requestID,
        });
        if(requestCheck.reviewID || userCheck.reviewID) return res.status(400).send('User Already Feedbacked');

        await User.findOneAndUpdate({
            _id: req.body.userID
        },{
            reviewID: review.id
        });
        await Request.findOneAndUpdate({
            _id: req.body.requestID
        },{
            reviewID: review.id
        });

        await review.save();        
        res.status(200).send(review);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.put('/hide/:id', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviewOld = await Review.findOne({
            _id: req.params.id          
        });

        if(!reviewOld) return res.status(404).send('Review Not Found...');
        
        await Review.updateOne({            
            _id: req.params.id          
        },{
            status: 'hidden'
        });

        let reviewNew = await Review.findOne({
            _id: reviewOld.id          
        });

        if(!reviewNew) return res.status(404).send('Error while Update');
        res.status(200).send(reviewNew);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.put('/unhide/:id', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviewOld = await Review.findOne({
            _id: req.params.id          
        });

        if(!reviewOld) return res.status(404).send('Review Not Found...');
        
        await Review.updateOne({            
            _id: req.params.id          
        },{
            status: 'unhidden'
        });

        let reviewNew = await Review.findOne({
            _id: reviewOld.id          
        });

        if(!reviewNew) return res.status(404).send('Error while Update');
        res.status(200).send(reviewNew);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.put('/:id', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        let reviewOld = await Review.findOne({
            _id: req.params.id          
        });

        if(!reviewOld) return res.status(404).send('Review Not Found...');
        
        await Review.updateOne({            
            _id: req.params.id          
        },{
            rate: req.body.rate,
            review: req.body.review
        });

        let reviewNew = await Review.findOne({
            _id: reviewOld.id          
        });

        if(!reviewNew) return res.status(404).send('Error while Update');
        res.status(200).send(reviewNew);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/:id',
    authenticate,
    async (req, res)=>{
    try{
        let review = await Review.findOneAndDelete({
            _id: req.params.id
        });
        if(!review) return res.status(404).send('Review Not Found');

        await User.findOneAndUpdate({
            _id: review.userID
        },{
            reviewID: null
        });
        await Request.findOneAndUpdate({
            _id: review.requestID
        },{
            reviewID: null
        });

        res.status(200).send(review);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

module.exports = router;