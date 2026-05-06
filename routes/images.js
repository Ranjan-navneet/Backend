const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// GET all active images sorted by order
router.get("/", async (req, res) => {
  try {
    const images = await Image.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add image
router.post("/", async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const images = await Image.insertMany(data);

    res.status(201).json({
      success: true,
      data: images,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// PUT update image
router.put("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    res.json({ success: true, data: image });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
