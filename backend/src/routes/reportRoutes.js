const express = require('express');
const router = express.Router();

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const { createReport , getReportByComplaint} = require('../controllers/reportController');
const auth = require('../../middleware/authMiddleware');

// ✅ CLOUDINARY
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'reports'
  }
});

const upload = multer({ storage });

// ✅ ROUTE
router.post('/:id', auth, upload.single('photo'), createReport);

router.get('/:id', auth, getReportByComplaint);

module.exports = router;