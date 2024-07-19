const productService = require("../Services/productService");
async function productGet(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const collection = await productService.productGet(skip, limit);
    res.status(200).send({ message: "success", collection });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
async function productGetById(req, res) {
  try {
    let id = req.query.id;
    const collection = await productService.productGetById(id);
    res.status(200).send({ message: "success", collection });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


module.exports = {productGet,productGetById };
