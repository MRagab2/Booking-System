const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

const feedbackController = require('../controllers/feedbackController');

router.get('/',
    authenticate,
    authorize,
    async (req, res)=>{
    try{
        let feedbacks = await feedbackController.getAllFeedbacks();
        if(typeof feedbacks === 'string')
            res.status(400).json(feedbacks);

        res.status(200).send(feedbacks);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.get('/:id',
    authenticate,
    async (req, res)=>{
    try{
        let feedback = await feedbackController.getFeedback(req.params.id)
        if(typeof feedback === 'string')
            return res.status(400).send(feedback);
        
        res.status(200).send(feedback);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.post('/',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        let feedback = await feedbackController.addFeedback(req.body);
        if(typeof feedback  === 'string') 
            return res.status(400).send(feedback);

        res.status(200).send(feedback);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.put('/:id',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        const feedback = await feedbackController.updateFeedback(
            req.params.id, 
            req.body);

        if(typeof feedback === 'string') 
            return res.status(400).send(feedback);

        res.status(200).send(feedback);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.delete('/:id',
    authenticate,
    authorize,
    async (req, res)=>{
    try{
        let feedback = await feedbackController.deleteFeedback(req.params.id);
        if(typeof feedback === 'string') 
            return res.status(400).send(feedback);

        res.status(200).send(feedback);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});
module.exports = router;