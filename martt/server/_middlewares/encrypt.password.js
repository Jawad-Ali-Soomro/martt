const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing the password!");
  }
};

module.exports = hashPassword;
