const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const Complaint = require('../models/Complaint');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require('path');
const fs = require('fs');
const User = require('../models/User');


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

//     const agent = await User.findOne({
//   role: "agent",
//   category: req.body.category,
//   city: req.body.city
// });

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
      // 👇 AUTO ASSIGN
  // assignedTo: agent ? agent._id : null,

  // // 👇 STATUS CHANGE
  // status: agent ? "Assigned" : "Pending"
  assignedTo: null,
status: "Pending"
    });

    await complaint.save();

    res.json({
      success: true,
    //   message: agent
    // ? "Complaint submitted & auto-assigned ✅"
    // : "Complaint submitted but no agent available ⚠️"
    message: "Complaint submitted successfully and waiting for admin assignment"
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

// router.get('/all', async (req, res) => {

//   try {

//     const complaints = await Complaint.find();

//     res.json(complaints);

//   } catch (err) {

//     res.status(500).json({ message: "Server Error" });

//   }

// });

router.get('/all', async (req, res) => {

  try {

    const complaints = await Complaint.find()
  .populate('assignedTo', 'name'); // ✅ correct field // 👈 important

    res.json(complaints);

  } catch (err) {
    console.log(err);
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
/* ================= GET AGENT COMPLAINTS ================= */

router.get('/agent', auth, async (req, res) => {

  try {

    console.log("AGENT ID:", req.user.id);

    const complaints = await Complaint.find({
      assignedTo: req.user.id
    });

    console.log("FOUND:", complaints.length);

    res.json(complaints);

  } catch (err) {

    console.log("ERROR:", err);

    res.status(500).json({ message: "Server Error" });

  }

});

/* ================= UPDATE STATUS ================= */

router.put('/update-status/:id', auth, async (req, res) => {

  try {

    const { status } = req.body;

    await Complaint.findByIdAndUpdate(
      req.params.id,
      { status }
    );

    res.json({ message: "Status Updated Successfully" });

  } catch (err) {

    console.log(err);

    res.status(500).json({ message: "Server Error" });

  }

});

/* ================= ADD FEEDBACK ================= */

router.put('/feedback/:id', auth, async (req, res) => {

  try {

    const { rating, comment } = req.body;

    await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        feedback: {
          rating: rating || null,
          comment: comment || ""
        }
      }
    );

    res.json({ message: "Feedback Submitted Successfully" });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server Error" });

  }

});

module.exports = router;

