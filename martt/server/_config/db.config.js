const mongoose = require("mongoose");
const connectMongoose = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("_database connected".cyan);
  });
};

module.exports = connectMongoose;
