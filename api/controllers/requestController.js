const Request = require("../models/requestModel");


let addRequest = async(req,res,next)=>{

};

let getAllRequests = async(req,res,next)=>{
    try{
        const requests = await Request.find().sort({
            createdAt:1
        });

        return requests;
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
};

module.exports = {
    addRequest,
    getAllRequests,    
};