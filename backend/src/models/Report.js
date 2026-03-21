const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({

  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint'
  },

  workDescription: String,
  materialUsed: String,
  completionDate: Date,
  progress: Number,
  finalRemark: String,
  photo: String

}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);