const { ctrlWrapper } = require("../helpers");
const { Product } = require("../models/product.js");

const getAllProducts = async (req, res) => {
  const { query } = req.query;
  let products;
  if (query) {
      products = await Product.find({
          name: { $regex: query, $options: 'i' }
      });
  } else {
      products = await Product.find();
  }
  const categories = await Product.distinct('category');
  res.json({ products, categories });
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    res.status(400).json({ message: "Product with this name already exists" });
  } else {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  }
};

const updateProduct = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;
  const product = await Product.findById(_id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct && existingProduct._id.toString() !== _id) {
      res
        .status(400)
        .json({ message: "Product with this name already exists" });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      res.json(updatedProduct);
    }
  }
};

const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findById(_id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    await Product.findByIdAndDelete(_id);
    res.json("Product deleted successfully");
  }
};


module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  addProduct: ctrlWrapper(addProduct),
  updateProduct: ctrlWrapper(updateProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
};
