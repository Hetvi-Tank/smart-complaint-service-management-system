const User = require('../models/User');

// Create Agent (Admin)
exports.createAgent = async (req, res) => {

  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  await User.create({
    name,
    email,
    password,
    role: 'agent'
  });

  res.json({ msg: "Agent Created Successfully" });
};

// Get All Agents
exports.getAgents = async (req, res) => {

  const agents = await User.find({ role: 'agent' });

  res.json(agents);
};