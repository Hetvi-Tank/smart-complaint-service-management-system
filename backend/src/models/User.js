const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true
},
  email: { type: String, unique: true },
  phone: String,
  password: String,
  category: String,
  gender: String,

  address: String,
  area: String,
  city: String,

  role: {
    type: String,
    enum: ["user", "admin", "agent"],
    default: "user"
  },
  status: {
  type: String,
  enum: ["Available", "Busy", "Not Available"],
  default: "Available"
}
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);