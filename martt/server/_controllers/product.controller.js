const { Product, Shop } = require("../_models");

const createProduct = async (req, res) => {
  try {
    const { shopId } = req.body;
    const newProduct = await Product.create({ ...req.body, shop: shopId });
    if (!newProduct) {
      return res.staus(201).json({
        msg: "Product not created!",
      });
    } else {
      const findShop = await Shop.findById(shopId);
      if (!findShop) {
        return res.status(201).json({
          msg: "Shop not found!",
        });
      } else {
        findShop.products.push(newProduct._id);
        await findShop.save();
      }
      return res.status(201).json({
        msg: "Product created successfully!",
        newProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error while creating product",
    });
  }
};

const getAllProducts = async (req, res) => {
  const foundProducts = await Product.find({}).populate("shop");
  if (!foundProducts) {
    return res.status(500).json({
      msg: "Error while fetching products",
    });
  } else {
    return res.status(200).json({
      msg: "Done!",
      foundProducts,
    });
  }
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  const foundProduct = await Product.findById(productId).populate("shop");
  if (!foundProduct || !productId) {
    return res.status(500).json({
      msg: "Error fetching...",
    });
  } else {
    return res.status(200).json({
      foundProduct,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
