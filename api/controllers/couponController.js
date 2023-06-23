const Coupon = require("../models/couponModel");

let addCoupon = async (couponInfo)=>{
    try{
        let check = await Coupon.findOne({            
            code: couponInfo.code          
        });
        if(check)
            return ('Coupon Already Existed');

        let coupon = new Coupon({
            code: couponInfo.code,
            title: couponInfo.title,
            discount: couponInfo.discount,
            privacy: couponInfo.privacy,
            allUsers: couponInfo.allUsers ? couponInfo.allUsers : false,
            expirationDate: couponInfo.expirationDate ? couponInfo.expirationDate : null
        });
        await coupon.save();

        return coupon;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getCoupon = async (id)=> {
    try{
        let coupon = await Coupon.findOne({            
            _id: id          
        });
        if(!coupon)
            return ('Coupon Not Found');

        return coupon;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllCoupons = async ()=> {
    try{
        const coupons = await Coupon.find().sort({
            createdAt:1
        });

        return coupons;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAccessibleCoupon = async (userID, couponID)=> {
    try{
        let coupon = await Coupon.findOne({            
            _id: couponID,
            $or: [
                {allUsers: true},
                {privacy: { 
                    $elemMatch: { userID } 
                }}
            ]           
        });
        if(!coupon)
            return ('Coupon Not Found');

        return coupon;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllAccessibleCoupon = async (userID)=> {
    try{
        let coupons = await Coupon.find({            
            $or: [
                {allUsers: true},
                {privacy: { 
                    $elemMatch: { userID } 
                }}                 
            ]      
        }).sort({
            createdAt:1
        });
        if(coupons.length == 0)
            return ('You Got No Coupons');

        return coupons;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateCoupon = async (oldID, newInfo)=> {
    try{
        let couponOld = await Coupon.findOne({
            _id: oldID         
        });
        if(!couponOld) 
            return ('Coupon Not Found');

        await Coupon.updateOne({            
            _id: oldID
        },{
            code: newInfo.code ? newInfo.code : couponOld.code,
            title: newInfo.title ? newInfo.title : couponOld.title,
            discount: newInfo.discount ? newInfo.discount : couponOld.discount,
            expirationDate: newInfo.expirationDate ? newInfo.expirationDate : couponOld.expirationDate,
            privacy: newInfo.privacy ? newInfo.privacy : couponOld.privacy,
            allUsers: newInfo.allUsers ? newInfo.allUsers : couponOld.allUsers,
        });

        let couponNew = await Coupon.findOne({
            _id: oldID          
        });
        if(!couponNew) 
            return ('Error while Update');

        return (couponNew);
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteCoupon = async (id)=>{
    try{
        let coupon = await Coupon.findOneAndDelete({
            _id: id
        });
        if(!coupon) 
            return ('Coupon Not Found');
        
        return coupon;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

module.exports = {
    addCoupon,
    getAllCoupons,
    getCoupon,
    getAccessibleCoupon,
    getAllAccessibleCoupon,
    updateCoupon,
    deleteCoupon
};