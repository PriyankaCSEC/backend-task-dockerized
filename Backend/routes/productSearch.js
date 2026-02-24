const express = require("express");
const router = express.Router();
const esClient = require("../config/elastic");
//search api for full text search


router.get("/", async (req, res) => {
  try {
    let q = req.query.q || ""; // text search
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;
    const from = (page - 1) * perPage;

    // Numeric filters
    let minPrice = parseFloat(req.query.minPrice);
    let maxPrice = parseFloat(req.query.maxPrice);

    // Parse natural language price queries from q
    // Examples: "phone under 200", "shoes below 50", "laptop above 1000", "tv over 500"
    const underRegex = /\b(?:under|below)\s+(\d+(?:\.\d+)?)\b/i;
    const overRegex = /\b(?:over|above)\s+(\d+(?:\.\d+)?)\b/i;

    const underMatch = q.match(underRegex);
    if (underMatch) {
      if (isNaN(maxPrice)) maxPrice = parseFloat(underMatch[1]);
      q = q.replace(underRegex, "").trim();
    }

    const overMatch = q.match(overRegex);
    if (overMatch) {
      if (isNaN(minPrice)) minPrice = parseFloat(overMatch[1]);
      q = q.replace(overRegex, "").trim();
    }

    // Replace multiple spaces with single space
    q = q.replace(/\s+/g, ' ').trim();

    // Build ES bool query
    const esQuery = {
      bool: {
        must: [],
        filter: []
      }
    };

    // Text search
    if (q) {
      esQuery.bool.must.push({
        bool: {
          should: [
            {
              wildcard: {
                pd_name: {
                  value: `*${q}*`,
                  case_insensitive: true
                }
              }
            },
            {
              wildcard: {
                pd_description: {
                  value: `*${q}*`,
                  case_insensitive: true
                }
              }
            },
            {
              wildcard: {
                cd_name: {
                  value: `*${q}*`,
                  case_insensitive: true
                }
              }
            },
            {
              wildcard: {
                cd_description: {
                  value: `*${q}*`,
                  case_insensitive: true
                }
              }
            }
          ],
          minimum_should_match: 1
        }
      });
    }

    // Price range filter
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      const range = {};
      if (!isNaN(minPrice)) range.gte = minPrice;
      if (!isNaN(maxPrice)) range.lte = maxPrice;
      esQuery.bool.filter.push({ range: { pd_price: range } });
    }

    // Execute search
    const { hits } = await esClient.search({
      index: "products",
      from,
      size: perPage,
      body: { query: esQuery }
    });

    // Send results in frontend-friendly format
    res.json({
      page,
      perPage,
      total: hits.total.value,
      totalPages: Math.ceil(hits.total.value / perPage),
      products: hits.hits.map(h => h._source)
    });
    // console.log("elastic search");
  } catch (err) {
    console.error("ElasticSearch search failed:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;