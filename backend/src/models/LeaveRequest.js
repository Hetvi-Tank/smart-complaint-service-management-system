const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({

  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  reason: String,
  description: String,

  fromDate: Date,
  toDate: Date,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("LeaveRequest", leaveSchema);