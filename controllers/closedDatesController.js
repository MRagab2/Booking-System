const ClosedDate = require('../models/closeDatesModel');

let addClosedDate = async (closeDateInfo)=>{
    try{            
        let closedDate = await ClosedDate.findOne({            
            day: closeDateInfo.day
        });
        if(!closedDate){
            closedDate = new ClosedDate({
                day: closeDateInfo.day
            });
            await closedDate.save();
        }
        await ClosedDate.updateOne({
                day: closeDateInfo.day 
            },
            { 
                $push: {
                    time: {
                        startTime: closeDateInfo.time.startTime, 
                        endTime: closeDateInfo.time.endTime
                    } 
                } 
            }
        );

        closedDate = await ClosedDate.findOne({            
            day: closeDateInfo.day
        });        

        return closedDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getClosedDatebyID = async (id)=> {
    try{
        let closedDate = await ClosedDate.findOne({            
            _id: id          
        });
        if(!closedDate)
            return ('Day Not Found');

        return closedDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getClosedDatebyDay = async (day)=> {
    try{
        let closedDate = await ClosedDate.findOne({            
            day: day          
        });
        if(!closedDate)
            return ('Day Not Found');

        return closedDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getClosedDatebyDayAndTime = async (day, time)=> {
    try{
        let closedDate = await ClosedDate.findOne({            
            day: day,
            time: { 
                $elemMatch: { 
                    startTime: time 
                } 
            }       
        });
        if(!closedDate)
            return ('Date Not Found');

        let chosenDate;
        closedDate.time.map(day =>{
            if(day.startTime === time)
                chosenDate = day
        })
        closedDate.time = chosenDate;

        return closedDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let getAllClosedDates = async ()=> {
    try{
        const closedDates = await ClosedDate.find().sort({
            createdAt:1
        });

        return closedDates;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let updateClosedDate = async (oldID, newInfo)=> {
    try{
        let closeDateOld = await ClosedDate.findOne({
            _id: oldID         
        });
        if(!closeDateOld) 
            return ('Date Not Found');

        await ClosedDate.updateOne({            
            _id: oldID
        },{
            day: newInfo.day ? newInfo.day : closeDateOld.day,
            time: newInfo.time ? newInfo.time : closeDateOld.time  
        });

        let closeDateNew = await ClosedDate.findOne({
            _id: oldID          
        });
        if(!closeDateNew) 
            return ('Error while Update');

        return (closeDateNew);
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteClosedDateDay = async (day)=>{
    try{
        let closedDate = await ClosedDate.findOneAndDelete({
            day: day
        });
        if(!closedDate) 
            return ('ClosedDate Not Found');
        
        return closedDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

let deleteClosedDateTime = async (day, time)=>{
    try{
        let closedDate = await ClosedDate.findOne({            
            day: day,
            time: { 
                $elemMatch: { 
                    startTime: time 
                } 
            }       
        });
        if(!closedDate)
            return ('Day Not Found');

        await ClosedDate.updateOne({
                day: day 
            },
            { 
                $pull: {
                    time: {
                        startTime: time, 
                        } 
                    } 
                }
        );
        
        let newDate = await ClosedDate.findOne({            
            day: day
        });

        return newDate;
    }catch(err){
        console.log(err);
        return (err.message);
    }
};

module.exports = {
    addClosedDate,
    getAllClosedDates,
    getClosedDatebyID,
    getClosedDatebyDay,
    getClosedDatebyDayAndTime,
    updateClosedDate,
    deleteClosedDateDay,
    deleteClosedDateTime
};