const express = require("express");
const router = express.Router();
const esClient = require("../config/elastic");

router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const { hits } = await esClient.search({
      index: "products",
      from: (page - 1) * perPage,
      size: perPage,
      query: {
        multi_match: {
          query,
          fields: ["pd_name^2", "pd_description"],
          fuzziness: "AUTO",
        },
      },
    });

    const products = hits.hits.map((h) => ({ pd_id: h._id, ...h._source }));

    res.json({
      page,
      perPage,
      total: hits.total.value,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;