const Product = require("../models/Product");
const Warehouse = require("../models/Warehouse");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, category, unit, lowStockThreshold } = req.body;
    const exists = await Product.findOne({ sku });
    if (exists) return res.status(400).json({ message: "SKU already exists" });

    const product = await Product.create({
      name,
      sku,
      category,
      unit,
      lowStockThreshold,
    });
    await Warehouse.create({ product: product._id });
    await FC.create({ product: product._id });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Product deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
