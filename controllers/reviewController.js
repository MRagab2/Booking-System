const Review = require("../models/reviewModel");
const User = require("../models/userModel");

let addReview = async(reviewInfo)=>{
    try{
        let userCheck = await User.findOne({
            _id: reviewInfo.userID,
        });
        if(!userCheck)
            return ('User Not Found');

        let reviewCheck = await Review.findOne({
            userID: reviewInfo.userID
        });

        if(userCheck.reviewID || reviewCheck) 
            return ('User Already Reviewd');
        
        let review = new Review({
            userID: userCheck.id,
            userName: userCheck.fullName,
            userAvatar: userCheck.avatar,
            rate: reviewInfo.rate.toLowerCase(),
            content: reviewInfo.content
        });

        await User.findOneAndUpdate({
            _id: reviewInfo.userID
        },{
            reviewID: review.id
        });
       
        await review.save();
        return review;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllReviews = async()=>{
    try{
        const reviews = await Review.find().sort({
            createdAt:1
        });

        return reviews;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getFilteredReviews = async(filter)=>{
    try{
        const reviews = await Review.find({
            status: filter
        }).sort({
            createdAt:1
        });
        
        return reviews;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getReview = async(id)=>{
    try{
        const review = await Review.findOne({
            _id: id
        });
        if(!review)
            return ('Review Not Found');

        return review;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateReview = async(oldID, newInfo)=>{
    try{
        let reviewOld = await Review.findOne({
            _id: oldID         
        });

        if(!reviewOld) 
            return ('Review Not Found...');
        
        await Review.updateOne({            
            _id: oldID         
        },{
            status: newInfo.status ? newInfo.status : reviewOld.status,
            rate: newInfo.rate ? newInfo.rate : reviewOld.rate,
            content: newInfo.content ? newInfo.content : reviewOld.content
        });

        let reviewNew = await Review.findOne({
            _id: reviewOld.id          
        });

        if(!reviewNew) 
            return ('Error while Update');

        return (reviewNew);
    }catch(err){
        console.log(err);
        return(err.message);
    }
};

let deleteReview = async(id)=>{
    try{
        let review = await Review.findOneAndDelete({
            _id: id
        });
        if(!review) 
            return ('Review Not Found');

        await User.findOneAndUpdate({
            _id: review.userID
        },{
            reviewID: null
        });

        return review;
    }catch(err){
        console.log(err);
        return(err.message);
    }
}

module.exports = {
    addReview,
    getAllReviews,    
    getFilteredReviews,
    getReview,
    updateReview,
    deleteReview
};