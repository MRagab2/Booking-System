const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const reviewController = require('../controllers/reviewController');

router.get('/', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        const reviews = await reviewController.getAllReviews();
        if(typeof reviews === 'string') 
            return res.status(404).send(reviews);
            
        let Reviews = new Array();
        reviews.map(review =>{
            let Review = {
                id : review.id,
                userName : review.userName,
                userAvatar : `${req.protocol}://${req.get('host')}/avatar/${review.userAvatar}`,
                rate : review.rate,
                content : review.content,
                status : review.status
            };
            Reviews.push(Review);
        });
        res.status(200).send(Reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/filter/:filter', 
    async(req,res)=>{
    try{
        const reviews = await reviewController.getFilteredReviews(req.params.filter);
        if(typeof reviews === 'string') 
            return res.status(404).send(reviews);
            
        let Reviews = new Array();
        reviews.map(review =>{
            let Review = {
                id : review.id,
                userName : review.userName,
                userAvatar : `${req.protocol}://${req.get('host')}/avatar/${review.userAvatar}`,
                rate : review.rate,
                content : review.content,
                status : review.status
            };
            Reviews.push(Review);
        });
        res.status(200).send(Reviews);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/:id', 
    async(req,res)=>{
    try{
        let review = await reviewController.getReview(req.params.id)
        if(typeof review === 'string') 
            return res.status(404).send(review);

        let Review = {
            id : review.id,
            userName : review.userName,
            userAvatar : `${req.protocol}://${req.get('host')}/avatar/${review.userAvatar}`,
            rate : review.rate,
            content : review.content,
            status : review.status
        };
        res.status(200).send(Review);
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

router.put('/hide/:id', 
    authenticate, 
    authorize,
    async(req,res)=>{
    try{
        if(req.body.status != 'unhidden')
            req.body.status = 'unhidden'
        else
            req.body.status = 'hidden'
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