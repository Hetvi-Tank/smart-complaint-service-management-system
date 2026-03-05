const express = require("express");
const router = express.Router();
const { createAgent } = require("../controllers/agentController");

router.post("/create", createAgent);

module.exports = router;