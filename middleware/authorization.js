const User = require("../models/userModel");

module.exports = async(req,res,next)=>{
    try{
        let user = await User.findOne({
            token: req.header("authToken"),
            role: 'admin'
        });

        if(!user)
            return res.status(400).send('Not Authorized...');
            
        next();
    }catch(err){
        next(err);
    }
}