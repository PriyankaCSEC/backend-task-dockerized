const esClient = require('./config/elastic');
async function run() {
  try {
    const res = await esClient.search({
      index: "products",
      body: {
        query: {
          bool: {
            must: [],
            filter: [
              { range: { pd_price: { gte: 10 } } }
            ]
          }
        }
      }
    });
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("ES Error:", err);
  }
}
run();
