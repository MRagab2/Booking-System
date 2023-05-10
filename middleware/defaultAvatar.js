const path = require('path');
const multer = require('multer');

module.exports = (req, res, next)=>{
    try{
    req.file = {
        path: path.join(__dirname,'../public/avatar/defaultAvatar.png'),
        originalname: 'defaultAvatar.png',
        mimetype: 'image/png',
        // fieldName: 'avatar'
    }
        
    next();
        
    }catch(err){
        next(err);
    }
}