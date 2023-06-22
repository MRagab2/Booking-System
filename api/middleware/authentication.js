const User = require("../models/userModel");

module.exports = async(req,res,next)=>{
    try{
        const token = req.header("authToken");
        if(!token)
            return res.status(400).send('Not Token...');
        
        let user = await User.findOne({
            token: req.header("authToken"),
            status: 'active'
        });
        if(!user)
            return res.status(400).send('Not User...');

        next();
    }catch(err){
        next(err);
    }
}