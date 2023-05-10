const userController = require('../controllers/userController');

module.exports = async(req,res,next)=>{
    try{
        let user = await userController.getUserByEmail(req,res,next);

        if(!user) 
            next();
        else
            res.status(400).send('User Already Exists..'); 

    }catch(err){
        next(err);
    }
}