const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required!"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Password must be at least 6 characters long!"],
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: {
        type: String,
      },
      country: { type: String },
    },
    notifications: {
      inApp: { type: Boolean, default: true },
    },
    orders: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        status: { type: String, default: "pending" },
        totalAmount: { type: Number },
        items: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number },
            price: { type: Number },
          },
        ],
        date: { type: Date, default: Date.now },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    paymentMethods: [
      {
        provider: {
          type: String,
          enum: ["Easypaisa", "JazzCash", "Upaisa", "Card"],
          required: true,
        },
        accountNumber: {
          type: String,
          required: true,
        },
        expiryDate: {
          type: String,
          required: function () {
            return this.provider === "Card";
          },
        },
      },
    ],
    preferredPaymentMethod: {
      type: String,
      enum: ["Easypaisa", "JazzCash", "Upaisa", "Card"],
    },
    shop: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
