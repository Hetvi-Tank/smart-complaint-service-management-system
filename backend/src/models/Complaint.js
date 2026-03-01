const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: String,
  priority: String,
  address: String,
  area: String,
  city: String,

  image: String

}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);