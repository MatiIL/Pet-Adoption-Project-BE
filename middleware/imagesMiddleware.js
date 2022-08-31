const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = multer({ dest: "./images" });

const imageUrl = (req, res, next) => {
  try {
    const imageUrl = "http://localhost:8080/pets" + req.file.path;
    req.body.petImageURL = imageUrl;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

cloudinary.config({
  cloud_name: "diwqlluil",
  api_key: "134585824587893",
  api_secret: "43QKk59JvtOEWH0AscPFhlRbE18",
});

function uploadToCloudinary(req, res, next) {
  if (!req.file) {
    res.status(400).send("No image attached");
    return;
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
   if(err) {
    res.status(500).send(err.message);
    return
   }
   if(result) {
    req.body.imageUrl = result.secure_url
    fs.unlinkSync(req.file.path)
    next()
   }
  });
}

module.exports = { upload, imageUrl, uploadToCloudinary };