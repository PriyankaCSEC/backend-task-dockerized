const express = require("express");
const router = express.Router();
// const Product = require("../models/Product");
// const Category = require("../models/Category");
const { Op } = require("sequelize");
const { Product, Category } = require("../models");

// GET all products with category info
//controller logic for fetching all products with their associated category
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category"
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

//search 
router.get("/search", async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    if (!q) {
      return res.json({ products: [], total: 0, totalPages: 0, page: 1 });
    }

    const result = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          as: "category",
          required: false
        }
      ],
      where: {
        [Op.or]: [
          { pd_name: { [Op.like]: `%${q}%` } },
          { pd_description: { [Op.like]: `%${q}%` } }
        ]
      },
      limit,
      offset,
      distinct: true
    });

    // Manual filter for category name
    const filtered = result.rows.filter(product =>
      product.category &&
      product.category.cd_name.toLowerCase().includes(q.toLowerCase())
      ||
      product.pd_name.toLowerCase().includes(q.toLowerCase())
      ||
      (product.pd_description || "").toLowerCase().includes(q.toLowerCase())
    );
console.log("SEARCH QUERY:", q);
console.log("RESULT COUNT:", result.count);
console.log("ROWS:", result.rows.map(p => p.pd_name));
    res.json({
      products: filtered,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      page: Number(page)
    });

  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
