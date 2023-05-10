const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

router.get('/',
    authenticate,
    authorize,
    async (req, res)=>{
    try{
        let feedbacks = await Feedback.find().sort({
            createdAt:1
        });
        
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
        let feedback = await Feedback.findOne({
            _id: req.params.id
        });
        if(!feedback) return res.status(404).send('Feedback Not Found');
        
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
        let feedback = new Feedback({
            userID: req.body.userID,
            content: req.body.content
        });

        let userCheck = await User.findOne({
            _id: feedback.userID,
        });
        if(userCheck.feedbackID) return res.status(400).send('User Already Feedbacked');

        await User.findOneAndUpdate({
            _id: feedback.userID
        },{
            feedbackID: feedback.id
        });
        await feedback.save();
        
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
        let feedbackOld = await Feedback.findOne({
            _id: req.params.id          
        });
        if(!feedbackOld) return res.status(404).send('Feedback Not Found');

        await Feedback.updateOne({            
            _id: req.params.id
        },{
            content: req.body.content ? req.body.content : feedbackOld.content        
        });

        let feedbackNew = await Feedback.findOne({
            _id: req.params.id          
        });

        if(!feedbackNew) return res.status(404).send('Error while Update');

        res.status(200).send(feedbackNew);
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
        let feedback = await Feedback.findOneAndDelete({
            _id: req.params.id
        });
        if(!feedback) return res.status(404).send('Feedback Not Found');

        await User.findOneAndUpdate({
            _id: feedback.userID
        },{
            feedbackID: null
        })

        res.status(200).send(feedback);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});
module.exports = router;