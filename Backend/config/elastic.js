const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({
  node: process.env.ELASTIC_NODE || "http://localhost:9200", // your ES URL
  apiVersion: "8.11",

});

module.exports = esClient;