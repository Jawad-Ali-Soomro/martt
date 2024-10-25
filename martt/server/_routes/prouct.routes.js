const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../_controllers");
const productRoute = express.Router();

productRoute.post("/new", createProduct);
productRoute.get("/all", getAllProducts);
productRoute.get("/:productId", getSingleProduct);

module.exports = productRoute;
