const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  // Teri frontend ki live link
  origin: "https://taskflow-production-c00c.up.railway.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Agar cookies ya sessions use kar raha ho toh
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Root route for health check (Railway logs mein dikhega ki server up hai)
app.get('/', (req, res) => {
  res.send('TaskFlow Backend is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is sprinting on port ${PORT}`);
});