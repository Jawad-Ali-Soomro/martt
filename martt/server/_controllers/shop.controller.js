const { Shop, User } = require("../_models");

const createShop = async (req, res) => {
  try {
    const { userId } = req.body;
    const newShop = await Shop.create({ ...req.body, owner: userId });
    if (!newShop) {
      return res.status(201).json({
        msg: "Error while creating shop!",
      });
    } else {
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(201).json({
          msg: "User not found!",
        });
      } else {
        findUser.shop.push(newShop._id);
        await findUser.save();
      }
      return res.status(201).json({
        msg: "Shop created successfully!",
        newShop,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while creating shop!",
      error: error,
    });
  }
};

module.exports = {
  createShop,
};
