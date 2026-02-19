const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [["pd_id", "ASC"]],
    });

    res.json({
      total: count,
      products: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
