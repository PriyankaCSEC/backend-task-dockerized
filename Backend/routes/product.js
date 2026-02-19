const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

// GET all products with category info
//controller logic for fetching all products with their associated category
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
