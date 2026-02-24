const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const { fn, col } = require("sequelize");

// Import routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const allProductsRoutes = require("./routes/allProducts");


// Import models (so Sequelize knows about relationships)
const Category = require("./models/Category");
const Product = require("./models/Product");

const app = express();

//elastic search
const productSearchRoutes = require("./routes/productSearch");

app.use(cors());//should be above the routes
app.use("/api/products/search-es", productSearchRoutes);

// Middleware

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/allproducts", allProductsRoutes);
// app.use("/api/products/search", productRoutes); // Reuse productRoutes for search endpoint

// Simple test route
app.get("/", (req, res) => res.send("Backend is running!"));

// Dedicated route to get paginated products by category name
// Example: GET /api/category=kitchenitems?page=1&perPage=10
app.get("/api/category=:name", async (req, res) => {
  try {
    const rawName = req.params.name;
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;

    if (!rawName) return res.status(400).json({ message: "Category name required" });

    // Find category by name (case-insensitive)
    const category = await Category.findOne({
      where: sequelize.where(fn("lower", col("cd_name")), rawName.toLowerCase())
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    const offset = (page - 1) * perPage;

    const { count, rows } = await Product.findAndCountAll({
      where: { cd_id: category.cd_id },
      include: { model: Category, as: "category" },
      limit: perPage,
      offset,
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      page,
      perPage,
      total: count,
      totalPages: Math.ceil(count / perPage),
      category: { cd_id: category.cd_id, cd_name: category.cd_name },
      products: rows
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// More standard route form: GET /api/category/:name?page=1&perPage=10
app.get("/api/category/:name", async (req, res) => {
  try {
    const rawName = req.params.name;
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;

    if (!rawName) return res.status(400).json({ message: "Category name required" });

    const category = await Category.findOne({
      where: sequelize.where(fn("lower", col("cd_name")), rawName.toLowerCase())
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    const offset = (page - 1) * perPage;

    const { count, rows } = await Product.findAndCountAll({
      where: { cd_id: category.cd_id },
      include: { model: Category, as: "category" },
      limit: perPage,
      offset,
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      page,
      perPage,
      total: count,
      totalPages: Math.ceil(count / perPage),
      category: { cd_id: category.cd_id, cd_name: category.cd_name },
      products: rows
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// Associations
// Category.hasMany(Product, {
//   foreignKey: "cd_id",
//   as: "products"
// });

// Product.belongsTo(Category, {
//   foreignKey: "cd_id",
//   as: "category"
// });
// Test DB connection & sync tables with retry
const MAX_RETRIES = 10;
const RETRY_DELAY = 3000;

const connectWithRetry = async (retries = 0) => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connection successful");

    // Sync models
    await sequelize.sync(); 
    console.log("✅ Tables synced");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error(`❌ DB Connection failed (attempt ${retries + 1}/${MAX_RETRIES}):`, err.message);
    if (retries < MAX_RETRIES - 1) {
      console.log(`🔄 Retrying in ${RETRY_DELAY}ms...`);
      setTimeout(() => connectWithRetry(retries + 1), RETRY_DELAY);
    } else {
      console.error("❌ Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

connectWithRetry();
