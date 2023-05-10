const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const Coupon = require("../models/couponModel");
const userController = require('../controllers/userController');

router.get('/',
            authenticate,
            authorize,
            async (req, res)=>{
    try{
        let coupons = await Coupon.find().sort({
            createdAt:1
        });
        
        res.status(200).send(coupons);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.get('/:id',
            authenticate,
            authorize,
            async (req, res)=>{
    try{
        let coupon = await Coupon.findOne({
            _id: req.params.id
        });

        if(!coupon) return res.status(404).send('Coupon Not Found');
        
        res.status(200).send(coupon);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.get('/privacy',
            authenticate,
            async (req, res)=>{
    try{
        let {_id : userID} = await userController.getUserByToken(req,res);
        let coupons = await Coupon.find({ 
            privacy: { 
                $elemMatch: { userID } } 
            }).sort({
            createdAt:1
        });
        
        if(coupons.length==0) return res.status(404).send('You Got No Coupons');
        res.status(200).send(coupons);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.post('/',
            authenticate,
            authorize,
            async (req, res)=>{
    try{
        let expirationDate = req.body.expirationDate ? req.body.expirationDate : null;
        let coupon = new Coupon({
            title: req.body.title,
            discount: req.body.discount,
            privacy: req.body.privacy,
            expirationDate: expirationDate
        });
        await coupon.save();
        
        res.status(200).send(coupon);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.put('/:id',
            authenticate,
            authorize,
            async (req, res)=>{
    try{
        let couponOld = await Coupon.findOne({
            _id: req.params.id          
        });
        if(!couponOld) return res.status(404).send('Coupon Not Found');
        
        await Coupon.updateOne({            
            _id: req.params.id
        },{
            title: req.body.title ? req.body.title : couponOld.title,
            discount: req.body.discount ? req.body.discount : couponOld.discount,
            expirationDate: req.body.expirationDate ? req.body.expirationDate : couponOld.expirationDate,
            privacy: req.body.privacy ? req.body.privacy : couponOld.privacy            
        });

        let couponNew = await Coupon.findOne({
            _id: req.params.id          
        });

        if(!couponNew) return res.status(404).send('Error while Update');

        res.status(200).send(couponNew);
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
        let coupon = await Coupon.findOneAndDelete({
            _id: req.params.id
        });
        if(!coupon) return res.status(404).send('Coupon Not Found');

        res.status(200).send(coupon);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

module.exports = router;