const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200' });
async function checkMapping() {
  try {
    const mapping = await esClient.indices.getMapping({ index: 'products' });
    console.log(JSON.stringify(mapping, null, 2));
  } catch (err) {
    console.error(err);
  }
}
checkMapping();
