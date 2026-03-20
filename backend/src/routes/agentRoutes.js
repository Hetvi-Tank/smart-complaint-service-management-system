const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

const authMiddleware = require("../../middleware/authMiddleware");
// GET ASSIGNED COMPLAINTS
router.get(
  "/assigned-complaints",
  authMiddleware,
  agentController.getAssignedComplaints
);


// UPDATE STATUS
router.put(
  "/update-status",
  authMiddleware,
  agentController.updateStatus
);



module.exports = router;