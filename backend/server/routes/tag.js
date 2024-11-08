const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

// Create Tag
router.post('/tags', async (req, res) => {
  try {
    const tag = new Tag({ name: req.body.name });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error creating tag", error });
  }
});

// Read All Tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error });
  }
});

// Update Tag by ID
router.put('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error updating tag", error });
  }
});

// Delete Tag by ID
router.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tag", error });
  }
});

module.exports = router;