// const User = require('../models/User');

// // Create Agent (Admin)
// exports.createAgent = async (req, res) => {

//   const { name, email, password } = req.body;

//   const oldUser = await User.findOne({ email });

//   if (oldUser) {
//     return res.status(400).json({ msg: "Email already exists" });
//   }

//   await User.create({
//     name,
//     email,
//     password,
//     role: 'agent'
//   });

//   res.json({ msg: "Agent Created Successfully" });
// };

// // Get All Agents
// exports.getAgents = async (req, res) => {

//   const agents = await User.find({ role: 'agent' });

//   res.json(agents);
// };
const User = require("../models/User");
const Complaint = require("../models/Complaint");


// CREATE AGENT
exports.createAgent = async (req, res) => {

  try {
    console.log("BODY DATA:", req.body);

    const { name, email, phone, area, city, category, gender } = req.body;

    if (!name || !email || !phone || !area || !city || !category || !gender) {
  return res.status(400).json({ message: "All fields are required" });
}

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const newAgent = new User({
      name,
      email,
      phone,
      area,
      city,
      category,
      gender,
      role: "agent",
      password: "123456"
    });

    await newAgent.save();

    res.status(201).json({
      message: "Agent created successfully",
      agent: newAgent
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET ALL AGENTS
exports.getAgents = async (req, res) => {

  try {

    const agents = await User.find({ role: "agent" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(agents);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// ASSIGN COMPLAINT TO AGENT
exports.assignComplaint = async (req, res) => {

  try {

    const { complaintId, agentId } = req.body;

    if (!complaintId || !agentId) {
      return res.status(400).json({
        message: "ComplaintId and AgentId required"
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(

      complaintId,

      {
        assignedTo: agentId,
        status: "Assigned"
      },

      {
        new: true,
        runValidators: false
      }

    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json({
      message: "Complaint assigned successfully",
      complaint
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ✅ UPDATE AGENT
exports.updateAgent = async (req, res) => {

  try {

    const agentId = req.params.id;

    // ❗ check assigned complaints
    const assigned = await Complaint.findOne({ assignedTo: agentId });

    if (assigned) {
      // return res.status(400).json({
      //   message: "Cannot update assigned agent"
      // });
      return res.status(400).json({
      message: "Agent is already assigned to complaints"
    });
    }

    const updated = await User.findByIdAndUpdate(
      agentId,
      req.body,
      { new: true }
    );

    res.json({
      message: "Agent Updated",
      agent: updated
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server Error" });

  }

};
exports.deleteAgent = async (req, res) => {
  try {

    const agentId = req.params.id;

    // 🔥 CHECK assigned complaints
    const assigned = await Complaint.findOne({
      assignedTo: agentId
    });

    if (assigned) {
      return res.status(400).json({
        message: "Agent is assigned to complaints, cannot delete"
      });
    }

    await User.findByIdAndDelete(agentId);

    res.json({ message: "Agent Deleted Successfully" });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server Error" });

  }
};