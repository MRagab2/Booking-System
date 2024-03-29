const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const requestConroller = require('../controllers/requestController');

router.get('/',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        const requests = await requestConroller.getAllRequests();
        if(typeof requests === 'string') 
            return res.status(404).send(requests);

        let Requests = new Array();
        requests.map(request =>{
            let Request = {
                id : request.id,
                day : request.day,
                startTime : request.startTime,
                endTime : request.endTime,
                price : request.price,
                couponID : request.couponID,
                status : request.status,
                userID : request.userID,
                userName : request.userName,
                userAvatar : `${req.protocol}://${req.get('host')}/avatar/${request.userAvatar}`,
                createdAt: request.createdAt,
            };
            Requests.push(Request);
        });
        res.status(200).send(Requests);
    }catch(err){
            console.log(err);
            res.status(400).send(err.message);
    }
});

router.get('/:id',
    authenticate,
    async (req,res)=>{
    try{
        let request = await requestConroller.getRequest(req.params.id);
        if(typeof request  === 'string') 
            return res.status(404).send(request);

        let Request = {
            id : request.id,
            day : request.day,
            startTime : request.startTime,
            endTime : request.endTime,
            price : request.price,
            couponID : request.couponID,
            status : request.status,
            userID : request.userID,
            userName : request.userName,
            userAvatar : `${req.protocol}://${req.get('host')}/avatar/${request.userAvatar}`,
            createdAt: request.createdAt,
        };
        res.status(200).send(Request);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.post('/',
    authenticate,
    async (req,res)=>{
    try{
        let request = await requestConroller.addRequest(req.body);
        if(typeof request  === 'string') 
            return res.status(400).send(request);

        res.status(200).send(request);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.put('/:id',
    authenticate,
    async (req, res)=>{
    try{
        const request = await requestConroller.updateRequest(
            req.params.id, 
            req.body);

        if(typeof request  === 'string') 
            return res.status(400).send(request);

        res.status(200).send(request);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/:id',
    async(req, res)=>{
        try{
            const request = await requestConroller.deleteRequest(req.params.id);
            if(typeof request  === 'string') 
                return res.status(400).send(request);
    
            res.status(200).send(request);
        }catch(err){
            console.log(err);
            res.status(400).send(err.message);
        }
})
module.exports = router;