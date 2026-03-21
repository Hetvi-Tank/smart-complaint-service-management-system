const express = require('express');
const Complaint = require('../models/Complaint');
const auth = require('../../middleware/authMiddleware');  // ✅ FIXED PATH
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');   // make sure uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= CREATE COMPLAINT ================= */

router.post('/create', auth, upload.single('image'), async (req, res) => {

  try {

    const complaint = new Complaint({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      status: 'Pending'
    });

    await complaint.save();

    res.json({ message: "Complaint Created Successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }

});

/* ================= GET AGENT COMPLAINTS ================= */

// router.get('/agent', auth, async (req, res) => {

//   try {

//     const complaints = await Complaint.find({ agent: req.user.id })
//       .populate('user', 'name');

//     res.json(complaints);

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }

// });

//* ================= GET AGENT COMPLAINTS ================= */

router.get('/agent', async (req, res) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("AGENT ID:", decoded.id);   // ✅ DEBUG

    const complaints = await Complaint.find({
      assignedTo: decoded.id
    });

    console.log("FOUND:", complaints.length); // ✅ DEBUG

    res.json(complaints);

  } catch (err) {

    console.log("ERROR:", err);   // ✅ DEBUG

    res.status(500).json({ message: "Server Error" });

  }

});
/* ================= USER MY COMPLAINTS ================= */

router.get('/my-complaints', auth, async (req, res) => {

  try {

    const complaints = await Complaint.find({
      user: req.user.id
    });

    res.json(complaints);

  } catch (err) {

    res.status(500).json({ message: "Server Error" });

  }

});

/* ================= UPDATE STATUS ================= */

router.put('/update-status/:id', auth, async (req, res) => {

  try {

    await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }
    );

    res.json({ message: "Status Updated" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }

});
exports.addFeedback = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    // ❗ Optional → check nathi karvanu compulsory
    await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        feedback: {
          rating: rating || null,
          comment: comment || ""
        }
      }
    );

    res.json({ message: "Feedback Submitted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = router;