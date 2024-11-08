const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Add a new project
router.post('/projects', async (req, res) => {
  const { title, description, image, projectLink, category, technologies, tags } = req.body;
  console.log("Received project data:", req.body);

  try {
    const project = new Project({
      title,
      description,
      image,
      projectLink,
      category,
      technologies,
      tags,
    });
    await project.save();
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

// Update a project by ID
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, image, projectLink, category, technologies, tags } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, projectLink, category, technologies, tags },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
});

// Delete a project by ID
router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
});

module.exports = router;