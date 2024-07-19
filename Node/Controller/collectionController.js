const collectionService = require("../Services/collectionService");
async function collectionGet(req, res) {
  try {
    const collection = await collectionService.collectionGet();
    res.status(200).send({ message: "success", collection });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}
async function collectionGetById(req, res) {
  try {
    let collectionId = req.query.id;
    const collection = await collectionService.collectionGetById(collectionId);
    res.status(200).send({ message: "success", collection });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


module.exports = {collectionGet,collectionGetById };
