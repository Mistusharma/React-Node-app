const express= require("express");
const collectionRoute = express.Router();
const collectionController= require("../Controller/collectionController")
const ShopifyService = require("shopify-api-node");

collectionRoute.get('/get',collectionController.collectionGet)

collectionRoute.get('/getById',collectionController.collectionGetById)
module.exports = collectionRoute;