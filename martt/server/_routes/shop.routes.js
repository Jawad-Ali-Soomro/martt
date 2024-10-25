const express = require("express");
const { createShop } = require("../_controllers");
const shopRoute = express.Router();

shopRoute.post("/new", createShop);

module.exports = shopRoute;
