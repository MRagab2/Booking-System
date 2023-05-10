const User = require("../models/userModel");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
// C R U D
let addUser = async (req,res,next)=>{
    
    try{
        let token= crypto.randomBytes(10).toString('hex')
        const avatar = `DefaultAvatar_${token}.png`;
        const sourcePath = 'public/avatar/DefaultAvatar.png';
        const destinationPath = `../Front/assets/imgs/avatar/${avatar}`;
        
        fs.readFile(sourcePath, (err, data) => {
            if (err) return res.status(400).send(err);
    
            // Write the image file to the destination path with a new name
            fs.writeFile(destinationPath, data, (err) => {
                if (err) return res.status(400).send(err);
    
            });
        });
        
        let user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone,
            token: token,
            avatar: avatar
        });
        await user.save();
        res.status(200).send({token: user.token});
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let getUserByEmail = async (req,res,next)=> {
    try{
        let user = await User.findOne({            
            email: req.body.email            
        });
        return user;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let getUserByToken = async (token)=> {
    try{
        // req.body.authToken = req.header("authToken") ? req.header("authToken") : req.body.authToken
        // console.log("555555555555555");

        let user = await User.findOne({            
            token
        });
        return user;
    }catch(err){
        console.log(err);
        return (err);
    }
};

let getUserByID = async (req,res,next)=> {
    try{
        let user = await User.findOne({            
            _id: req.body.id          
        });
        return user;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let getAllUsers = async (req,res,next)=> {
    try{
        const users = await User.find({
            role:"user"
        }).sort({
            createdAt:1
        });

        return users;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let updateUser = async (req,res,next)=> {
    try{
        let userOld = await User.findOne({
            email: req.body.email          
        });
        if(!userOld) {
            fs.unlinkSync('../Front/assets/imgs/avatar/' + req.file.filename);
            return ('User Not Found..')
        };

        let avatar = userOld.avatar;
        if(req.file){
            avatar = req.file.filename ;
            fs.unlinkSync('../Front/assets/imgs/avatar/' + userOld.avatar);
        }

        await User.updateOne({            
            email: req.body.email          
        },{
            fullName: req.body.fullName ? req.body.fullName : userOld.fullName,
            phone: req.body.phone ? req.body.phone : userOld.phone,
            avatar: avatar,
            status: req.body.status ? req.body.status : userOld.status,
            requestID: req.body.requestID ? req.body.requestID : userOld.requestID,
            reviewID: req.body.reviewID ? req.body.reviewID : userOld.reviewID,
            feedbackID: req.body.feedbackID ? req.body.feedbackID : userOld.feedbackID
        });

        if(req.body.password){
            let password1 = req.body.password ;
            let password2 = req.body.passwordConfirm ;
            if(password1 == password2){
                await User.updateOne({            
                    email: req.body.email          
                },{
                    password: await bcrypt.hash(password1, 10),
                });
            }else{
                return ("passwords doesn't match");
            }
        }        

        let userNew = await User.findOne({
            email: userOld.email          
        });

        if(!userNew) return ('Error while Update');

        return userNew;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let activateUser = async (req,res,next)=> {
    try{
        let userOld = await User.findOne({
            email: req.body.email          
        });

        let newActive;
        switch(userOld.status){
            case 'active':
                newActive = 'inactive';
                break;
            case 'inactive':
                newActive = 'active';
                break;
        }
        await User.updateOne({            
            email: req.body.email          
        },{
            status: newActive
        });

        let userNew = await User.findOne({
            email: userOld.email          
        });

        if(!userNew) return res.status(404).send('Error while Update');

        return userNew;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let setUserActivate = async (req,res,next)=> {
    try{
        let userOld = await User.findOne({
            email: req.body.email          
        });

        if(!userOld) return res.status(404).send('User Not Found...');
        
        await User.updateOne({            
            email: req.body.email          
        },{
            status: 'active'
        });

        let userNew = await User.findOne({
            email: userOld.email          
        });

        if(!userNew) return res.status(404).send('Error while Update');

        return userNew;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let setUserInactivate = async (req,res,next)=> {
    try{
        let userOld = await User.findOne({
            email: req.body.email          
        });

        await User.updateOne({            
            email: req.body.email          
        },{
            status: 'inactive'
        });

        let userNew = await User.findOne({
            email: userOld.email          
        });

        if(!userNew) return res.status(404).send('Error while Update');

        return userNew;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

let deleteUser = async (req,res,next)=>{
    try{
    let user = await User.findOneAndDelete({
        email: req.params.email
    });
    if(!user) return res.status(404).send('User Not Found');

    return user;
}catch(err){
    console.log(err);
    res.status(400).send(err.message);
}
}


module.exports = {
    addUser,
    getUserByEmail,
    getUserByToken,
    getUserByID,
    getAllUsers,
    updateUser,
    activateUser,
    setUserActivate,
    setUserInactivate,
    deleteUser
};