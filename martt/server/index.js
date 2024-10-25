const express = require("express");
const connectMongoose = require("./_config/db.config");
const app = express();
const colors = require("colors");
app.use(express.json());
const cors = require("cors");
const { userRoute, shopRoute, productRoute } = require("./_routes");
require("dotenv").config({
  path: "./_config/.env",
});
connectMongoose();
app.use(cors());
app.use("/user", userRoute);
app.use("/shop", shopRoute);
app.use("/product", productRoute);
app.listen(process.env.PORT || 8080, () => {
  console.log("server for martt. is running".cyan);
});
