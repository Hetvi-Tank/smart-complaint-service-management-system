const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const leaveController = require("../controllers/leaveController");
const { createAgent, getAssignedComplaints,getAllAgents } = require("../controllers/agentController");
const authMiddleware = require("../../middleware/authMiddleware");
const auth = require('../../middleware/authMiddleware');
const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const transporter = require('../config/email');
// GET ASSIGNED COMPLAINTS
router.get(
  "/assigned-complaints",
  authMiddleware,
  agentController.getAssignedComplaints
);
// // 🔹 Admin creates agent
 router.post("/create", createAgent);
// router.post("/create", async (req, res) => {
//   try {
//     const newAgent = new User({
//       ...req.body,
//       role: "agent",
//       status: "Available" // 🔥 ADD THIS
//     });

//     await newAgent.save();
//     res.json({ message: "Agent created successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
 router.get("/all", agentController.getAllAgents);

// UPDATE STATUS
router.put(
  "/update-status",
  authMiddleware,
  agentController.updateStatus
);



// router.post('/apply-leave', auth, async (req, res) => {

//   try {

//     const leave = new LeaveRequest({
//       agent: req.user.id,
//       reason: req.body.reason,
//       description: req.body.description,
//       fromDate: req.body.fromDate,
//       toDate: req.body.toDate
//     });

//     await leave.save();

//     res.json({ message: "Leave request submitted" });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }

// });

// router.get('/all-leaves', async (req, res) => {

//   try {

//     const leaves = await LeaveRequest.find()
//       .populate('agent', 'name email');

//     res.json(leaves);

//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }

// });


/* ================= ADMIN APPROVE / REJECT LEAVE ================= */

// router.put('/leave-action/:id', async (req, res) => {

//   try {

//     const { status } = req.body; // Approved / Rejected

//     const leave = await LeaveRequest.findById(req.params.id).populate('agent');

//     if (!leave) {
//       return res.status(404).json({ message: "Leave not found" });
//     }

//     leave.status = status;
//     await leave.save();

//     // 🔥 Agent status change only if approved
//     if (status === "Approved") {

//       await User.findByIdAndUpdate(leave.agent, {
//         status: "Not Available"
//       });

      

//     }
    

//     res.json({ message: "Leave updated successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }

// });

// router.put('/leave-action/:id', async (req, res) => {

//   try {

//     const { status } = req.body;

//     const leave = await LeaveRequest.findById(req.params.id)
//       .populate('agent'); // 👈 IMPORTANT

//     if (!leave) {
//       return res.status(404).json({ message: "Leave not found" });
//     }

//     leave.status = status;
//     await leave.save();

//     if (status === "Approved") {

//       await User.findByIdAndUpdate(leave.agent._id, {
//         status: "Not Available"
//       });

//       // 📧 SEND EMAIL
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: leave.agent.email,
//         subject: "Leave Approved ✅",
//         text: `Hello ${leave.agent.name}, your leave has been approved.`
//       });

//     }

//     if (status === "Rejected") {

//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: leave.agent.email,
//         subject: "Leave Rejected ❌",
//         text: `Hello ${leave.agent.name}, your leave request was rejected.`
//       });

//     }

//     res.json({ message: "Leave updated successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }

// });

router.post("/apply-leave", auth, leaveController.applyLeave);

// 🔹 Get All Leaves (Admin)
router.get("/all-leaves", leaveController.getAllLeaves);

// 🔹 Approve / Reject Leave (Admin)
router.put("/leave-action/:id", leaveController.leaveAction);
module.exports = router;