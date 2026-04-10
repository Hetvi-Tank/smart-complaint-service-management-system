const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reason: { type: String, required: true },
  description: String,
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "Approved", "Rejected"],   // ← small "pending"
    default: "pending"
  },
  rejectionReason: String
}, { timestamps: true });

module.exports = mongoose.model("LeaveRequest", leaveSchema);