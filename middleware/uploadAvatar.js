const router = require('express').Router();
const multer = require('multer');
const { v4 : uuidv4 } = require('uuid');
const path = require('path');
let User = require('../models/userModel');

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) { 
        cb(null, 'public/avatar/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes (file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });
module.exports = upload;


// const fs = require('fs');

// module.exports = (req, res, next)=>{
//   if (req.body.avatar) {
//     try {
//       const base64Data = req.body.avatar.replace(/^data:image\/\w+;base64,/, '');
//       const bufferData = Buffer.from(base64Data, 'base64');
//       const filename = Date.now() + '.png'; // Generate a unique filename
//       const filePath = path.join('public/avatar', filename); // Specify the destination path

//       fs.writeFile(filePath, bufferData, function (error) {
//         if (error) {
//           console.error('Error saving the image:', error);
//           return res.status(500).json({ error: 'Failed to save the image.' });
//         }
//         req.file = {
//           fieldname: 'avatar',
//           originalname: filename,
//           path: filePath,
//         };
//         next();
//       });
//     } catch (error) {
//       console.error('Error handling base64 image:', error);
//       return res.status(400).json({ error: 'Invalid base64 image data.' });
//     }
//   } else {
//     next();
//   }
// }