require("dotenv").config();
const sequelize = require("../config/db");
const Product = require("../models/Product");
const esClient = require("../config/elastic");

(async () => {
  try {
    await sequelize.authenticate();

    const products = await Product.findAll();
    console.log(`Found ${products.length} products in MySQL`);

    const bulkBody = [];

    products.forEach((product) => {
      bulkBody.push(
        {
          index: {
            _index: "products",
            _id: product.pd_id,
          },
        },
        {
          pd_name: product.pd_name,
          pd_description: product.pd_description,
          pd_price: product.pd_price,
          cd_id: product.cd_id,
          createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        }
      );
    });

    await esClient.bulk({
      refresh: true,
      body: bulkBody,
    });

    console.log("✅ Products indexed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Indexing failed:", error);
    process.exit(1);
  }
})();


//Run this script once to push your current DB products to ElasticSearch:
// node scripts/indexProductsToES.js
