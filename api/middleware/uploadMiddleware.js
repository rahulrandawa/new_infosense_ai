const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
    },
   });
   
   var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
   
    
    } else {
    console.log("only jpg and png file supported");
    cb(null, false);
    }
    },
   });
   
   module.exports =upload;