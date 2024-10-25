const jwt = require("jsonwebtoken");

const hashData = async (data) => {
  try {
    const hashedData = await jwt.sign({ data }, process.env.SECRET_KEY);
    return hashedData; // Return the hashed data
  } catch (error) {
    throw new Error("Error while hashing data!"); // Throw an error if hashing fails
  }
};

module.exports = hashData;
