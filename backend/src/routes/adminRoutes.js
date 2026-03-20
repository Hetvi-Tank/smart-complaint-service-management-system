const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const { createAgent, getAgents } = require('../controllers/adminController');

router.post('/create-agent', createAgent);
router.get('/agents', getAgents);
// ASSIGN COMPLAINT
router.post("/assign-complaint", adminController.assignComplaint);

module.exports = router;