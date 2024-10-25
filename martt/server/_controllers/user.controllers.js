const { hashPassword, hashData } = require("../_middlewares");
const { User } = require("../_models");
const bcrypt = require("bcryptjs");

const createAccount = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        msg: "Please fill all the required fields!",
      });
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({
        msg: "User already exists!",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({
        msg: "Error while creating account!",
      });
    }
    const hashedData = await hashData({ newUser });

    return res.status(201).json({
      msg: "Account created successfully!",
      hashedData: newUser?._id,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      msg: "An unexpected error occurred while creating the account.",
      error: error.message || "Internal Server Error",
    });
  }
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please fill all the required fields!",
    });
  }

  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(404).json({
      msg: "User not found!",
    });
  }
  const isValidPassword = await bcrypt.compare(password, findUser.password);

  if (!isValidPassword) {
    return res.status(401).json({
      msg: "Invalid password!",
    });
  }

  return res.status(200).json({
    msg: "Login successful!",
    hashedData: findUser._id,
  });
};
const updateAccount = async (req, res) => {};
const deleteAccount = async (req, res) => {};
const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: "Please provide user id!",
    });
  }
  const findUser = await User.findById(id);
  if (!findUser) {
    return res.status(404).json({
      msg: "User not found!",
    });
  }
  return res.status(200).json({
    msg: "User found!",
    user: findUser,
  });
};
const forgotPassword = async (req, res) => {};
const resetPassword = async (req, res) => {};
const changePassword = async (req, res) => {};

module.exports = {
  createAccount,
  loginAccount,
  getProfile,
};
