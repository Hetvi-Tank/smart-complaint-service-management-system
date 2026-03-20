const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const Complaint = require('../models/Complaint');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require('path');
const fs = require('fs');


const auth = require('../../middleware/authMiddleware');

const router = express.Router();



const uploadPath = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }

// });


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "complaints",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});


const upload = multer({ storage });

/* CREATE COMPLAINT */

router.post('/create', upload.single('image'), async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const complaint = new Complaint({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      address: req.body.address,
      area: req.body.area,
      city: req.body.city,
      image: req.file ? req.file.path : null,
      user: decoded.id,
      status: "Pending"
    });

    await complaint.save();

    res.json({
      success: true,
      message: "Complaint Saved Successfully"
    });

  } catch (err) {

    console.log("SERVER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});


/* GET ALL COMPLAINTS (ADMIN) */

router.get('/all', async (req, res) => {

  try {

    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (err) {

    res.status(500).json({ message: "Server Error" });

  }

});


/* GET USER COMPLAINTS */

router.get('/my-complaints', async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const complaints = await Complaint.find({
      user: decoded.id
    });

    res.json(complaints);

  } catch (err) {

    console.log(err);

    res.status(500).json({ message: "Server Error" });

  }

});


module.exports = router;