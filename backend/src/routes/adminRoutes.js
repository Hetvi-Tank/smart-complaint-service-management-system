const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const { createAgent, getAgents } = require('../controllers/adminController');
const { updateAgent , deleteAgent } = require('../controllers/adminController');

router.post('/create-agent', createAgent);
router.get('/agents', getAgents);
// ASSIGN COMPLAINT
router.post("/assign-complaint", adminController.assignComplaint);
router.put('/update-agent/:id', updateAgent);
router.delete('/delete-agent/:id', deleteAgent);

const User = require('../models/User');

router.put('/leave-action/:id', async (req, res) => {

  try {

    const { status } = req.body;

    const leave = await LeaveRequest.findById(req.params.id);

    leave.status = status;
    await leave.save();

    // 🔥 Agent status change
    if(status === "Approved"){

      await User.findByIdAndUpdate(leave.agent, {
        status: "Not Available"
      });

    }

    res.json({ message: "Leave updated" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }

});

module.exports = router;