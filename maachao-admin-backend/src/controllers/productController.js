import Product from "../models/Product.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, meta } = req.body;
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const slug = slugify(name, { lower: true });
    const product = new Product({
      name, slug, description, price: Number(price || 0),
      category, subCategory: subCategory || null, images, meta: meta ? JSON.parse(meta) : {}
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate("category subCategory addons").sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateProduct = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.name) update.slug = slugify(update.name, { lower: true });
    if (req.files && req.files.length) {
      const newImages = req.files.map(f => `/uploads/${f.filename}`);
      // push new images
      update.$push = { images: { $each: newImages } };
      // remove keys that would conflict with findByIdAndUpdate structure
      const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
      return res.json(product);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() }, { new: true });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
