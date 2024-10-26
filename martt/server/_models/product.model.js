const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], // Array of image URLs as strings
    required: true, // If every product must have images, set this
  },
  quantity: {
    type: Number,
    default: 0, // Set a default quantity if necessary
  },
  sizes: [
    {
      type: String,
      enum: ["small", "medium", "large", "extra large"],
    },
  ],
  color: [
    {
      type: String,
      default: "black",
    },
  ],
  category: {
    type: String,
    required: true, // Add required if needed
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop"
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
