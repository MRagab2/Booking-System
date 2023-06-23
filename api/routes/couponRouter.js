const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const Coupon = require("../models/couponModel");
const couponController = require('../controllers/couponController');
const userController = require('../controllers/userController');

router.get('/',
    authenticate,
    authorize,
    async (req, res)=>{
    try{
        let coupons = await couponController.getAllCoupons();
        if(typeof coupons === 'string')
            res.status(400).json(coupons);
        
        res.status(200).send(coupons);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.get('/accessible/:id',
    authenticate,
    async (req, res)=>{
    try{
        let user = await userController.getUserByToken( req.header("authToken") );
        let coupon = await couponController.getAccessibleCoupon(user.id, req.params.id);
        
        if(typeof coupon === 'string') 
            return res.status(400).send(coupon);

        res.status(200).send(coupon);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.get('/accessible',
    authenticate,
    async (req, res)=>{
    try{
        let user = await userController.getUserByToken( req.header("authToken") );
        if(typeof user === 'string') 
            return res.status(400).send(user);

        let coupons = await couponController.getAllAccessibleCoupon(user.id);
        if(typeof coupons === 'string') 
            return res.status(400).send(coupons);

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
        let coupon = await couponController.getCoupon(req.params.id)
        if(typeof coupon === 'string')
            return res.status(400).send(coupon);
        
        res.status(200).send(coupon);
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
        let coupon = await couponController.addCoupon(req.body);
        if(typeof coupon  === 'string') 
            return res.status(400).send(coupon);
        
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
        let coupon = await couponController.updateCoupon(
            req.params.id, 
            req.body);

        if(typeof coupon === 'string') 
            return res.status(400).send(coupon);

        res.status(200).send(coupon);
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
        let coupon = await couponController.deleteCoupon(req.params.id);
        if(typeof coupon === 'string') 
            return res.status(400).send(coupon);

        res.status(200).send(coupon);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

module.exports = router;