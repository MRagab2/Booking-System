const express = require('express');
const router = express.Router();

const validatInput = require('../middleware/registerValidator');
const checkExistence = require('../middleware/userExistence');
const passConfirm = require('../middleware/passwordConfirmation');

const userController = require('../controllers/userController');

router.post('/',
    validatInput,   
    checkExistence,
    passConfirm,
    async (req, res)=>{
        try{
            const userInfo = req.body;
            const user = await userController.addUser(userInfo);
            if(user.message)
                res.status(500).send(user.message);

            res.status(200).send(user);
        }catch(err){
            console.log(err);
            res.status(500).send(err);
        }
        
    }
);

module.exports = router;