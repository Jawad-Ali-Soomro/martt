const {
  createAccount,
  loginAccount,
  getProfile,
} = require("./user.controllers");

const { createShop } = require("./shop.controller");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("./product.controller");

module.exports = {
  createAccount,
  loginAccount,
  getProfile,
  createShop,
  createProduct,
  getAllProducts,
  getSingleProduct,
};
