const Request = require("../models/requestModel");
const User = require("../models/userModel");


let addRequest = async(requestInfo)=>{
    try{
        let requestCheck = await Request.findOne({
            userID: requestInfo.userID
        });
        if(requestCheck)
            return ('Request Already Exist');
            
        requestCheck = await User.findOne({
            _id: requestInfo.userID
        });
        if(requestCheck)
            return ('Request Already Exist');

        const request = new Request({
            day: requestInfo.day,
            startTime: requestInfo.startTime,
            endTime: requestInfo.endTime,
            price: requestInfo.price,
            couponID: requestInfo.couponID ? requestInfo.couponID : null,
            userID: requestInfo.userID,
        });
        await request.save();

        await User.findOneAndUpdate({
            _id: request.userID
        },{
            requestID: request.id
        });

        return request;
    }catch(err){
        console.log(err);
        return(err.message);
    }
};

let getAllRequests = async()=>{
    try{
        const requests = await Request.find().sort({
            createdAt:1
        });

        return requests;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getRequest = async(id)=>{
    try{
        const request = await Request.findOne({
            _id: id
        });
        if(!request)
            return ('Request Not Found');

        return request;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateRequest = async(oldID, newInfo)=>{
    try{
        let requestOld = await Request.findOne({
            _id: oldID
        });
        if(!requestOld) 
            return ('Request Not Found');

        await Request.updateOne({            
            _id: oldID          
        },{
            day: newInfo.day ? newInfo.day : requestOld.day,
            startTime: newInfo.startTime ? newInfo.startTime : requestOld.startTime,
            endTime: newInfo.endTime ? newInfo.endTime : requestOld.endTime,
            price: newInfo.price ? newInfo.price : requestOld.price,
            couponID: newInfo.couponID ? newInfo.couponID : requestOld.couponID,
            status: newInfo.status ? newInfo.status : requestOld.status,
            reviewID: newInfo.reviewID ? newInfo.reviewID : requestOld.reviewID
        });

        let requestNew = await Request.findOne({
            _id: requestOld.id          
        });
        if(!requestNew) 
            return ('Error while Update');

        return (requestNew);
    }catch(err){
        console.log(err);
        return(err.message);
    }
};

let deleteRequest = async(id)=>{
    try{
        let request = await Request.findOneAndDelete({
            _id: id
        });
        if(!request) 
            return ('Request Not Found');

        await User.findOneAndUpdate({
            _id: request.userID
        },{
            requestID: null
        });

        return request;
    }catch(err){
        console.log(err);
        return(err.message);
    }
}
module.exports = {
    addRequest,
    getAllRequests,    
    getRequest,
    updateRequest,
    deleteRequest
};