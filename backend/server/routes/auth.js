const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name, role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 3. Get All Members Route (Admin ke liye dropdown banane ke liye)
router.get('/members', async (req, res) => {
  try {
    const members = await User.find({ role: 'Member' }).select('name _id');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;