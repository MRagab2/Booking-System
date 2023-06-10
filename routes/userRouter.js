const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');
const upload = require('../middleware/uploadAvatar');

const userController = require('../controllers/userController');

router.get('/',
    authenticate,
    // authorize, 
    async (req,res)=>{
    try{
        let users = await userController.getAllUsers();
        if(typeof users === 'string')
            res.status(400).json(users);

/*request details + its review..... */
        users.map(user =>{
            user.avatar = `${req.protocol}://${req.get('host')}/avatar/${user.avatar}`
        });
        res.status(200).send(users);
    }catch(err){ 
        console.log(err)
        res.status(400).json(err.message);
    }
});

router.get('/email/:email',
    authenticate,
    async (req,res)=>{
    try{
        let user = await userController.getUserByEmail(req.params.email);

        if(typeof user === 'string') 
            return res.status(404).json(user);

        user.avatar = `${req.protocol}://${req.get('host')}/avatar/${user.avatar}`
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});
router.get('/id/:id',
    authenticate,
    async (req,res)=>{
    try{
        let user = await userController.getUserByID(req.params.id);
        if(typeof user === 'string') 
            return res.status(404).json(user);

        user.avatar = `${req.protocol}://${req.get('host')}/avatar/${user.avatar}`
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.put('/:id',
    authenticate,
    upload.single('avatar'),
    async (req,res)=>{
    try{
        
        let user = await userController.updateUser(
                req.params.id, 
                req.body, 
                req.file
            );
        if(!user) 
            return res.status(404).send('User Not Found..');

        if(typeof user === 'string') 
            return res.status(404).send(user);
        
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.delete('/:id',
    authenticate,
    authorize,
    async (req,res)=>{
    try{
        let user = await userController.deleteUser(req.params.id);

        if(typeof user === 'string') 
            return res.status(404).send(user);
        
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});

module.exports = router;