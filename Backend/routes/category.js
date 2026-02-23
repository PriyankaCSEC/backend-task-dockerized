const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


// GET all categories
//controller logic for fetching all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
