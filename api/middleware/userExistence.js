const userController = require('../controllers/userController');

module.exports = async(req,res,next)=>{
    try{
        let user = await userController.getUserByEmail(req.body.email);

        if(typeof user == 'string') 
            next();
        else
            res.status(400).send('User Already Existed..'); 

    }catch(err){
        next(err);
    }
}