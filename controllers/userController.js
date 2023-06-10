const User = require("../models/userModel");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');

let addUser = async (userInfo)=>{
    try{
        let token = crypto.randomBytes(10).toString('hex')
        const avatar = defaultAvatar(token);
        
        let user = new User({
            fullName: userInfo.fullName,
            email: userInfo.email,
            password: await bcrypt.hash(userInfo.password, 10),
            phone: userInfo.phone,
            token: token,
            avatar: avatar
        });
        await user.save();

        return user;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getUserByEmail = async (email, host)=> {
    try{
        let user = await User.findOne({            
            email: email            
        });
        if(!user)
            return ('User Not Found');

        user.avatar = `http://${host}/DefaultAvatar_c79088f7100460199fa7.png`
        return user;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getUserByToken = async (token)=> {
    try{
        let user = await User.findOne({            
            token: token
        });
        if(!user)
            return ('User Not Found');

        return user;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getUserByID = async (id)=> {
    try{
        let user = await User.findOne({            
            id: id          
        });
        if(!user)
            return ('User Not Found');

        return user;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllUsers = async ()=> {
    try{
        const users = await User.find({
            role:"user"
        }).sort({
            createdAt:1
        });

        return users;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateUser = async (oldID, newInfo, newAvatar)=> {
    try{
        let userOld = await User.findOne({
            _id: oldID          
        });

        if(!userOld) {
            if(newAvatar)
                fs.unlinkSync('public/avatar/' + newAvatar.filename);
            return ('User Not Found..');
        };

        let avatar = userOld.avatar;
        if(newAvatar){
            avatar = newAvatar.filename ;
            fs.unlinkSync('public/avatar/' + userOld.avatar);
        }

        await User.updateOne({            
            _id: oldID          
        },{
            fullName: newInfo.fullName ? newInfo.fullName : userOld.fullName,
            email: newInfo.email ? newInfo.email : userOld.email,
            phone: newInfo.phone ? newInfo.phone : userOld.phone,
            avatar: avatar,
            status: newInfo.status ? newInfo.status : userOld.status,
            requestID: newInfo.requestID ? newInfo.requestID : userOld.requestID,
            reviewID: newInfo.reviewID ? newInfo.reviewID : userOld.reviewID,
            feedbackID: newInfo.feedbackID ? newInfo.feedbackID : userOld.feedbackID
        });

        if(newInfo.password){
            let password1 = newInfo.password ;
            let password2 = newInfo.passwordConfirm ;
            if(password1 == password2){
                await User.updateOne({            
                    _id: oldID          
                },{
                    password: await bcrypt.hash(password1, 10),
                });
            }else{
                return ("passwords doesn't match");
            }
        }        

        let userNew = await User.findOne({
            _id: oldID          
        });

        if(!userNew) return ('Error while Update');

        return userNew;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteUser = async (id)=>{
    try{
        let user = await User.findOneAndDelete({
            _id: id
        });

        if(!user) 
            return ('User Not Found');

        fs.unlinkSync('public/avatar/' + user.avatar);
        return user;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let defaultAvatar = (token)=>{
    try{
        const avatar = `DefaultAvatar_${token}.png`;
        const sourcePath = 'public/avatar/DefaultAvatar.png';
        const destinationPath = `public/avatar/${avatar}`;
        
        fs.readFile(sourcePath, (err, data) => {
            if (err) return (err.message);

            // Write the image file to the destination path with a new name
            fs.writeFile(destinationPath, data, (err) => {
                if (err) return (err.message);

            });
        });
        return avatar;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

module.exports = {
    addUser,
    getUserByEmail,
    getUserByToken,
    getUserByID,
    getAllUsers,
    updateUser,
    deleteUser
};