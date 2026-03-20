// const mongoose = require('mongoose');

// const complaintSchema = new mongoose.Schema({

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },

//   title: {
//     type: String,
//     required: true
//   },

//   description: {
//     type: String,
//     required: true
//   },

//   category: String,
//   priority: String,
//   address: String,
//   area: String,
//   city: String,

//   image: String,

//   status: {
//     type: String,
//     default: "Pending"
//   }

// }, { timestamps: true });

// module.exports = mongoose.model('Complaint', complaintSchema);
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  image: {
    type: String,
    default: ""
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  status: {
    type: String,
    enum: ["Pending", "Assigned", "In Progress", "Completed"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);