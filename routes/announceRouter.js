const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const announceController = require('../controllers/announceController');
const userController = require('../controllers/userController');
const User = require('../models/userModel');

router.get('/accessible',
        async (req,res)=>{
    try{
        let userToken = req.header("authToken") ? req.header("authToken") : '';
        let user = new User();
        if(userToken)
            user = await userController.getUserByToken( req.header("authToken") );
        else
            user.id = '0';
        
        let announces = await announceController.getAllAccessibleAnnounce(user.id);

        if(typeof announces === 'string') 
            return res.status(400).send(announces);
        
        res.status(200).send(announces);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/accessible/:id',
        async (req,res)=>{
    try{
        let userToken = req.header("authToken") ? req.header("authToken") : '';
        let user = new User();
        if(userToken)
            user = await userController.getUserByToken( req.header("authToken") );
        else
            user.id = '';
        
        let announce = await announceController.getAccessibleAnnounce(user.id, req.params.id);

        if(typeof announce === 'string') 
            return res.status(400).send(announce);
        
        res.status(200).send(announce);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/',
    async (req,res)=>{
    try{
        let announces = await announceController.getAllAnnounces();
        if(typeof announces === 'string')
            return res.status(400).json(announces);
        
        res.status(200).send(announces);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/:id',
    authenticate,
    async (req,res)=>{
    try{
        let announce = await announceController.getAnnounce(req.params.id)
        if(typeof announce === 'string')
            return res.status(400).send(announce);

        res.status(200).send(announce);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.post('/',
        authenticate,
        authorize,
        async (req,res)=>{
    try{
        let announce = await announceController.addAnnounce(req.body)
        if(typeof announce  === 'string') 
            return res.status(400).send(announce);

        res.status(200).send(announce);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.put('/:id',
        authenticate,
        authorize,
        async (req,res)=>{
    try{
        let announce = await announceController.updateAnnounce(
            req.params.id, 
            req.body);

        if(typeof announce === 'string') 
            return res.status(400).send(announce);

        res.status(200).send(announce);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/:id',
        authenticate,
        authorize,
        async (req,res)=>{
    try{
        let announce = await announceController.deleteAnnounce(req.params.id);
        if(typeof announce === 'string') 
            return res.status(400).send(announce);

        res.status(200).send(announce);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;