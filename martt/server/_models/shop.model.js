const mongoose = require("mongoose");
const shopSchema = new mongoose.Schema({
  name: String,
  location: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
