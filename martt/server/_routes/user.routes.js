const express = require("express");
const { createAccount, loginAccount, getProfile } = require("../_controllers");
const userRoute = express.Router();

userRoute.post("/new", createAccount);
userRoute.post("/login", loginAccount);
userRoute.get("/profile/:id", getProfile);

module.exports = userRoute;
