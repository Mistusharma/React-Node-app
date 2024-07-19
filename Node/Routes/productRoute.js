const express= require("express");
const productRoute = express.Router();
const productController= require("../Controller/productController")

productRoute.get('/get',productController.productGet)
productRoute.get('/getById',productController.productGetById)
module.exports = productRoute;