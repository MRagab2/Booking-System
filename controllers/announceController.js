const Announce = require("../models/announceModel");

let addAnnounce = async (announceInfo)=>{
    try{            
        let announce = new Announce({
            title: announceInfo.title,
            content: announceInfo.content,
            privacy: announceInfo.privacy,
            allUsers: announceInfo.allUsers ? announceInfo.allUsers : false,
        });
        await announce.save();

        return announce;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAnnounce = async (id)=> {
    try{
        let announce = await Announce.findOne({            
            _id: id          
        });
        if(!announce)
            return ('Announce Not Found');

        return announce;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllAnnounces = async ()=> {
    try{
        const announces = await Announce.find().sort({
            createdAt:1
        });

        return announces;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAccessibleAnnounce = async (userID, announceID)=> {
    try{
        let announce = await Announce.findOne({            
            _id: announceID,
            $or: [
                {allUsers: true},
                {privacy: { 
                    $elemMatch: { userID } 
                }}
            ]            
        });
        if(!announce)
            return ('Announce Not Found');

        return announce;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllAccessibleAnnounce = async (userID)=> {
    try{
        let announces = await Announce.find({            
            $or: [
                {allUsers: true},
                {privacy: { 
                    $elemMatch: { userID } 
                }}
            ]            
        }).sort({
            createdAt:1
        });
        if(announces.length == 0)
            return ('You Got No Announces');

        return announces;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateAnnounce = async (oldID, newInfo)=> {
    try{
        let announceOld = await Announce.findOne({
            _id: oldID         
        });
        if(!announceOld) 
            return ('Announce Not Found');

        await Announce.updateOne({            
            _id: oldID
        },{
            title: newInfo.title ? newInfo.title : announceOld.title,
            content: newInfo.content ? newInfo.content : announceOld.content,
            privacy: newInfo.privacy ? newInfo.privacy : announceOld.privacy,
            allUsers: newInfo.allUsers ? newInfo.allUsers : announceOld.allUsers ,
        });

        let announceNew = await Announce.findOne({
            _id: oldID          
        });
        if(!announceNew) 
            return ('Error while Update');

        return (announceNew);
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteAnnounce = async (id)=>{
    try{
        let announce = await Announce.findOneAndDelete({
            _id: id
        });
        if(!announce) 
            return ('Announce Not Found');
        
        return announce;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

module.exports = {
    addAnnounce,
    getAllAnnounces,
    getAnnounce,
    getAccessibleAnnounce,
    getAllAccessibleAnnounce,
    updateAnnounce,
    deleteAnnounce
};