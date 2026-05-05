const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// ✅ Get All Projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().populate('admin', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Create Project (Admin Only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, admin } = req.body;
    if (!name || !admin) {
      return res.status(400).json({ error: "Name and Admin ID are required" });
    }
    const newProject = new Project({ name, description, admin });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ DELETE Project (Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ msg: 'Access Denied: Admins Only' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    
    // Project delete hone par uske saare tasks bhi delete
    await Task.deleteMany({ project: req.params.id });

    res.json({ msg: 'Project and associated tasks deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;