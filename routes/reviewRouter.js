const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Review = require("../models/reviewModel");

const reviewController = require('../controllers/reviewController');

router.get('/', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        const reviews = await reviewController.getAllReviews();
        if(typeof reviews === 'string') 
            return res.status(404).send(reviews);
        
        res.status(200).send(reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/filter/:filter', 
    // authenticate, 
    async(req,res)=>{
    try{
        const reviews = await reviewController.getFilteredReviews(req.params.filter);
        if(typeof reviews === 'string') 
            return res.status(404).send(reviews);
        
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
        let review = await reviewController.getReview(req.params.id)
        if(typeof review === 'string') 
            return res.status(404).send(review);

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
        let review = await reviewController.addReview(req.body);
        if(typeof review  === 'string') 
            return res.status(400).send(review);

        res.status(200).send(review);
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
        const review = await reviewController.updateReview(
            req.params.id, 
            req.body);

        if(typeof review  === 'string') 
            return res.status(400).send(review);

        res.status(200).send(review);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/:id',
    authenticate,
    async (req, res)=>{
    try{
        const review = await reviewController.deleteReview(req.params.id);
            if(typeof review  === 'string') 
                return res.status(400).send(review);

        res.status(200).send(review);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

module.exports = router;