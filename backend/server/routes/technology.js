const express = require('express');
const router = express.Router();
const Technology = require('../models/Technology');

// Create Technology
router.post('/technologies', async (req, res) => {
  try {
    const technology = new Technology({
      name: req.body.name,
      icon: req.body.icon,
      description: req.body.description,
    });
    await technology.save();
    res.status(201).json(technology);
  } catch (error) {
    res.status(500).json({ message: "Error creating technology", error });
  }
});

// Read All Technologies
router.get('/technologies', async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.status(200).json(technologies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching technologies", error });
  }
});

// Update Technology by ID
router.put('/technologies/:id', async (req, res) => {
  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        description: req.body.description,
      },
      { new: true }
    );
    if (!technology) return res.status(404).json({ message: "Technology not found" });
    res.status(200).json(technology);
  } catch (error) {
    res.status(500).json({ message: "Error updating technology", error });
  }
});

// Delete Technology by ID
router.delete('/technologies/:id', async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    if (!technology) return res.status(404).json({ message: "Technology not found" });
    res.status(200).json({ message: "Technology deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting technology", error });
  }
});

module.exports = router;