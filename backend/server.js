require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const agentRoutes = require('./src/routes/agentRoutes'); // ✅ FIXED

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/agents', agentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});