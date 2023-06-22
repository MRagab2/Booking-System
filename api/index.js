// Packages
const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
app.use('/avatar', express.static(path.join(__dirname, 'public', 'avatar')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:3000",
        "http://localhost:4000"
    ]
}));

// Port
const port = process.env.PORT || 4000;

// Connect DB
const connectDB = require('./db/dbConnection');
const dbConfig = require('./db/dbConfigration.json');
connectDB(dbConfig);

// APIs
const registerRouter = require('./routes/registerRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const userRouter = require('./routes/userRouter.js');
const reviewRouter = require('./routes/reviewRouter.js');
const requestRouter = require('./routes/requestRouter.js');
const couponRouter = require('./routes/couponRouter.js');
const feedbackRouter = require('./routes/feedbackRouter.js');
const announceRouter = require('./routes/announceRouter.js');
const closeDates = require('./routes/closeDatesRouter.js');

// End Points
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/user',userRouter);
app.use('/review',reviewRouter);
app.use('/request',requestRouter);
app.use('/coupon',couponRouter);
app.use('/feedback',feedbackRouter);
app.use('/announcement',announceRouter);
app.use('/closed',closeDates);

// Run
app.listen(port,()=>{
    console.log(`Listening at ${port}..!`)
});