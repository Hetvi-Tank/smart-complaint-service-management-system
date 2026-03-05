const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,

  // 👇 Ye add karo
  category: String,
  gender: String,

  address: String,
  area: String,
  city: String,

  role: {
    type: String,
    enum: ["user", "admin", "agent"],
    default: "user"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);