
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// 🔐 Random Password Generator
function generateRandomPassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// 📧 Send Email Function
async function sendEmail(to, password) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Your Agent Account Created",
    html: `
      <h3>Welcome to Our System</h3>
      <p><b>Email:</b> ${to}</p>
      <p><b>Password:</b> ${password}</p>
      <p>Please login and change your password.</p>
    `
  });
}

// 🚀 Create Agent Controller
exports.createAgent = async (req, res) => {
  try {

    const { name, email, phone, category, gender } = req.body;

    if (!name || !email || !phone || !category || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const randomPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newAgent = new Agent({
      name,
      email,
      phone,
      category,
      gender,
      password: hashedPassword
    });

    await newAgent.save();

    await sendEmail(email, randomPassword);

    res.status(201).json({
      message: "Agent created successfully & email sent!"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};