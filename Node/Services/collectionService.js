const collectionListWithProductIdsModel = require("../Model/collectionListWithProductIds");
const collectionModel = require("../Model/collection");
const allProducts = require("../Model/allproducts")
async function collectionGet() {
  try {
    const collection = await collectionModel.find();
    return collection;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function collectionGetById(collectionId) {
  try {
    let productIds = await collectionListWithProductIdsModel.find( { collectionId: collectionId });

    // return productIds;
    if (productIds) {
      // const products = await allProducts.find({ id: productIds.id });
      const idsArray = productIds.map(item => item.id);

      // Fetch product data for the retrieved IDs
      const products = await allProducts.find({ id: { $in: idsArray } });
      console.log("products: ", products);
      return products;
    }

  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports = { collectionGet, collectionGetById };
