const express = require('express');
const router = express.Router();
const { createAgent, getAgents } = require('../controllers/adminController');

router.post('/create-agent', createAgent);
router.get('/agents', getAgents);

module.exports = router;