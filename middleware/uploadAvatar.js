const multer = require("multer");
const path = require("path");

// CONFIGURATION FOR MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Front/assets/imgs/avatar/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });
module.exports = upload;

// module.exports = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../Front/assets/imgs/avatar/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   })
// }).single('avatar');
