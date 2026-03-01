const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Complaint = require('../models/Complaint');

const router = express.Router();

/* Ensure uploads folder exists */
const uploadPath = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* Multer config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/* CREATE COMPLAINT */
router.post('/create', upload.single('image'), async (req, res) => {

  try {

    const complaint = new Complaint({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      address: req.body.address,
      area: req.body.area,
      city: req.body.city,
      image: req.file ? req.file.filename : null
    });

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint Saved Successfully"
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }

});

module.exports = router;