const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const validatInput = require('../middleware/loginValidator');
const userController = require('../controllers/userController');

router.post('/',
            validatInput,   
            async(req,res)=>{
    try{
        let user = await userController.getUserByEmail(req.body.email);
        if(typeof user === 'string')
            return res.status(400).send("Email Not Found..")        

        let passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCheck) 
            return res.status(400).send("Wrong Password");
        
        res.header("authToken",user.token);
        delete user.password;
        res.status(200).json({
            id: user.id,
            email: user.email,
            token: user.token,
            role: user.role,
        });
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;
