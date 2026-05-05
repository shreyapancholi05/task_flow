const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// ✅ Get All Tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name')
      .populate('project', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Create Task (Admin Only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access Denied: Admins Only' });
    }
    const newTask = new Task(req.body);
    await newTask.save();
    const populatedTask = await Task.findById(newTask._id).populate('assignedTo', 'name');
    res.json(populatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update Task Status
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('assignedTo', 'name');
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE Task (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access Denied: Admins Only' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;