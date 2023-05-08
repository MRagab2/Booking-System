const mongoose = require('mongoose');


module.exports = (dbInfo)=>{
    mongoose.connect(`mongodb+srv://${dbInfo.username}:${dbInfo.password}@${dbInfo.cluster}.cvjezz4.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        console.log("DataBase Connected");
    }).catch((err)=>{
        console.log(err);
    });
};