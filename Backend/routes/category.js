const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// CREATE category
// router.post("/", async (req, res) => {
//   try {
//     const { cd_name, cd_description } = req.body;

//     const category = await Category.create({
//       cd_name,
//       cd_description
//     });

//     res.status(201).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
