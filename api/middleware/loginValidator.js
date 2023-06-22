const validator = require("../util/loginSchema");

module.exports = (req,res,next)=>{
    let valid = validator(req.body);

    if(valid){
        req.valid = 1
        next();
    }
    else{
        res.status(403).send("There is Something Wrong in Inputs");
    }
}

