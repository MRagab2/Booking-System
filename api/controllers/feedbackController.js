const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

let addFeedback = async (feedbackInfo)=>{
    try{
        let userCheck = await User.findOne({
            _id: feedbackInfo.userID,
        });
        if(userCheck) 
            return ('User Already Feedbacked');

        let feedback = new Feedback({
            userID: feedbackInfo.userID,
            content: feedbackInfo.content
        });

        await User.findOneAndUpdate({
            _id: feedbackInfo.userID
        },{
            feedbackID: feedbackInfo.id
        });
        await feedback.save();

        return feedback;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getFeedback = async (id)=> {
    try{
        let feedback = await Feedback.findOne({            
            _id: id          
        });
        if(!feedback)
            return ('Feedback Not Found');

        return feedback;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllFeedbacks = async ()=> {
    try{
        const feedbacks = await Feedback.find().sort({
            createdAt:1
        });

        return feedbacks;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateFeedback = async (oldID, newInfo)=> {
    try{
        let feedbackOld = await Feedback.findOne({
            _id: oldID         
        });
        if(!feedbackOld) 
            return ('Feedback Not Found');

        await Feedback.updateOne({            
            _id: oldID
        },{
            content: newInfo.content ? newInfo.content : feedbackOld.content        
        });

        let feedbackNew = await Feedback.findOne({
            _id: oldID          
        });
        if(!feedbackNew) 
            return ('Error while Update');

        return (feedbackNew);
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteFeedback = async (id)=>{
    try{
        let feedback = await Feedback.findOneAndDelete({
            _id: id
        });
        if(!feedback) 
            return ('Feedback Not Found');

        await User.findOneAndUpdate({
            _id: request.userID
        },{
            requestID: null
        });
        
        return feedback;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

module.exports = {
    addFeedback,
    getAllFeedbacks,
    getFeedback,
    updateFeedback,
    deleteFeedback
};