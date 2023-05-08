module.exports = async(req,res,next)=>{
    try{
        let password1 = req.body.password ;
        let password2 = req.body.passwordConfirm ;
        if(password1 == password2){
            next();
        }else{
            res.status(400).send("passwords doesn't match"); 
        }

    }catch(err){
        next(err);
    }
}