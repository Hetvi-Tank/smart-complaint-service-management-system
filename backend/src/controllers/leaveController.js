// const LeaveRequest = require('../models/LeaveRequest');
// const User = require('../models/User');
// const transporter = require('../config/email');

// // ✅ Apply Leave
// // exports.applyLeave = async (req, res) => {
// //   try {
// //     const leave = new LeaveRequest({
// //       agent: req.user.id,
// //       reason: req.body.reason,
// //       description: req.body.description,
// //       fromDate: req.body.fromDate,
// //       toDate: req.body.toDate
// //     });

// //     await leave.save();

// //     res.json({ message: "Leave request submitted" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // exports.applyLeave = async (req, res) => {
// //   try {

// //     const { fromDate, toDate, reason, description } = req.body;
// //     const agentId = req.user.id;

// //     // 🔥 CHECK overlapping leave
// //     const existingLeave = await LeaveRequest.findOne({
// //       agent: agentId,
// //       status: { $in: ["pending", "Approved"] }, // only active leaves
// //       $or: [
// //         {
// //           fromDate: { $lte: toDate },
// //           toDate: { $gte: fromDate }
// //         }
// //       ]
// //     });

// //     if (existingLeave) {
// //       return res.status(400).json({
// //         message: "You already applied for leave in this date range"
// //       });
// //     }

// //     // ✅ SAVE NEW LEAVE
// //     const leave = new LeaveRequest({
// //       agent: agentId,
// //       reason,
// //       description,
// //       fromDate,
// //       toDate
// //     });

// //     await leave.save();

// //     res.json({ message: "Leave request submitted" });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// exports.applyLeave = async (req, res) => {
//   try {
//     const { reason, description, fromDate, toDate } = req.body;
//     const agentId = req.user.id;

//     if (!reason || !fromDate || !toDate) {
//       return res.status(400).json({
//         message: "Reason, From Date and To Date are required"
//       });
//     }

//     // 🔥 Overlapping check
//     const existing = await LeaveRequest.findOne({
//       agent: agentId,
//       status: { $in: ["pending", "Approved"] },
//       $or: [
//         {
//           fromDate: { $lte: new Date(toDate) },
//           toDate: { $gte: new Date(fromDate) }
//         }
//       ]
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "You already have a leave in these dates!"
//       });
//     }

//     // ✅ Save Leave
//     const leave = new LeaveRequest({
//       agent: agentId,
//       reason,
//       description,
//       fromDate: new Date(fromDate),
//       toDate: new Date(toDate),
//       status: "pending"
//     });

//     await leave.save();

//     // 🔥 Agent details
//     const agent = await User.findById(agentId).select("name email");

//     // 🔥 EMAIL TO ADMIN (from agentController)
//     await transporter.sendMail({
//       from: `"Smart Complaint System" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER, // admin
//       subject: `New Leave Request - ${agent.name}`,
//       text: `Hello Admin,

// A new leave request has been submitted:

// Agent Name  : ${agent.name}
// Agent Email : ${agent.email}
// Reason      : ${reason}
// Description : ${description || "Not provided"}
// From Date   : ${fromDate}
// To Date     : ${toDate}

// Please login to approve or reject.

// - Smart Complaint System`
//     });

//     res.status(201).json({
//       message: "Leave request submitted & sent to admin"
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ✅ Get All Leaves
// exports.getAllLeaves = async (req, res) => {
//   try {
//     const leaves = await LeaveRequest.find()
//       .populate('agent', 'name email');

//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ✅ Approve / Reject Leave
// exports.leaveAction = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const leave = await LeaveRequest.findById(req.params.id)
//       .populate('agent');

//     if (!leave) {
//       return res.status(404).json({ message: "Leave not found" });
//     }

//     leave.status = status;
//     await leave.save();

//     if (status === "Approved") {
//       await User.findByIdAndUpdate(leave.agent._id, {
//         status: "Not Available"
//       });

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
// };

const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const transporter = require('../config/email');

// ✅ APPLY LEAVE (WITH ADMIN EMAIL + OVERLAP CHECK)
exports.applyLeave = async (req, res) => {
  try {
    const { reason, description, fromDate, toDate } = req.body;
    const agentId = req.user.id;

    if (!reason || !fromDate || !toDate) {
      return res.status(400).json({
        message: "Reason, From Date and To Date are required"
      });
    }

    // 🔥 Overlapping check
    const existing = await LeaveRequest.findOne({
      agent: agentId,
      status: { $in: ["pending", "Approved"] },
      $or: [
        {
          fromDate: { $lte: new Date(toDate) },
          toDate: { $gte: new Date(fromDate) }
        }
      ]
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a leave in these dates!"
      });
    }

    // ✅ Save Leave
    const leave = new LeaveRequest({
      agent: agentId,
      reason,
      description,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      status: "pending"
    });

    await leave.save();

    // 🔥 Agent details
    const agent = await User.findById(agentId).select("name email");

    // 🔥 EMAIL TO ADMIN
    await transporter.sendMail({
      from: `"Smart Complaint System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Leave Request - ${agent.name}`,
      text: `Hello Admin,

A new leave request has been submitted:

Agent Name  : ${agent.name}
Agent Email : ${agent.email}
Reason      : ${reason}
Description : ${description || "Not provided"}
From Date   : ${fromDate}
To Date     : ${toDate}

Please login to approve or reject.

- Smart Complaint System`
    });

    res.status(201).json({
      message: "Leave request submitted & sent to admin"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET MY LEAVES (NEW ADD)
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ agent: req.user.id })
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET ALL LEAVES (ADMIN)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate('agent', 'name email status')
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ APPROVE / REJECT (WITH VALIDATION + REASON + EMAIL)
exports.leaveAction = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    // 🔥 Validation
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        message: "Status must be Approved or Rejected"
      });
    }

    const leave = await LeaveRequest.findById(req.params.id)
      .populate('agent');

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;

    // 🔥 Save rejection reason
    if (status === "Rejected") {
      leave.rejectionReason = rejectionReason;
    }

    await leave.save();

    // ✅ APPROVED
    if (status === "Approved") {
      await User.findByIdAndUpdate(leave.agent._id, {
        status: "Not Available"
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: leave.agent.email,
        subject: "Leave Approved ✅",
        text: `Hello ${leave.agent.name},

Your leave has been APPROVED.

From: ${leave.fromDate.toDateString()}
To: ${leave.toDate.toDateString()}

Enjoy your time off!

- Smart Complaint System`
      });
    }

    // ❌ REJECTED
    if (status === "Rejected") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: leave.agent.email,
        subject: "Leave Rejected ❌",
        text: `Hello ${leave.agent.name},

Your leave request has been REJECTED.

Reason: ${rejectionReason || "No reason provided"}

- Smart Complaint System`
      });
    }

    res.json({ message: `Leave ${status} successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};