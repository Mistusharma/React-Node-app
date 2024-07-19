const collectionListWithProductIdsModel = require("../Model/collectionListWithProductIds");
const collectionModel = require("../Model/collection");
const allProducts = require("../Model/allproducts")
async function productGet(skip, limit) {
  try {
    const collection = await allProducts.find().skip(skip).limit(limit);
    return collection;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function productGetById(id) {
  try {
    let productIds = await allProducts.find({ id: id });
    return productIds;
   
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports = { productGet, productGetById };
