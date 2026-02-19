const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const allProductsRoutes = require("./routes/allProducts");


// Import models (so Sequelize knows about relationships)
const Category = require("./models/Category");
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/allproducts", allProductsRoutes);

// Simple test route
app.get("/", (req, res) => res.send("Backend is running!"));

// Test DB connection & sync tables
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connection successful");

    // Sync models
    await sequelize.sync({ alter: true }); // alter: true updates tables if needed
    console.log("✅ Tables synced");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB Connection failed:", err);
  }
})();
