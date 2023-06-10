const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const closedDatesController = require('../controllers/closedDatesController');

router.get('/',
    async (req,res)=>{
    try{   
        let closedDates = await closedDatesController.getAllClosedDates();
        if(typeof closedDates === 'string')
            return res.status(400).json(closedDates);
        
        res.status(200).send(closedDates);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/day/:day',
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.getClosedDatebyDay(req.params.day);
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);

        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/id/:id',
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.getClosedDatebyID(req.params.id);
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);

        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get('/:day/:time',
    authenticate,
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.getClosedDatebyDayAndTime(
                req.params.day,
                req.params.time
            );
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);
            
        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.post('/',
    async(req, res)=>{
    try{
        const closedDate = await closedDatesController.addClosedDate(req.body);
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);

        res.status(200).json(closedDate);
    }catch(err){
        console.log(err);
        res.send(err)
    }
})

router.put('/:id',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.updateClosedDate(
            req.params.id, 
            req.body);

        if(typeof closedDate === 'string') 
            return res.status(400).send(closedDate);

        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/day/:day',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.deleteClosedDateDay(req.params.day);
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);

        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.delete('/time/:day/:time',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        let closedDate = await closedDatesController.deleteClosedDateTime(
            req.params.day,
            req.params.time
        );
        if(typeof closedDate === 'string')
            return res.status(400).json(closedDate);

        res.status(200).send(closedDate);
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;