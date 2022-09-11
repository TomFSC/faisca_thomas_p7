//-----------Modules import---------
const multer = require("multer");

//File types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //Images folder destination if no error
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //Get file name replace spaces with underscore
    const fileName = file.originalname.split(" ").join("_");
    //Create file extension with file types
    const extension = MIME_TYPES[file.mimetype];
    //Create fileName with timeStamp to render unique file name
    callback(null, fileName + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
