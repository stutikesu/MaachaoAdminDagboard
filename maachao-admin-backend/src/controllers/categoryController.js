import Category from "../models/Category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name, description, parent } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const slug = slugify(name, { lower: true });
    const cat = new Category({ name, slug, description, parent: parent || null, imageUrl });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listCategories = async (req, res) => {
  try {
    const items = await Category.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Not found" });
    res.json(cat);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateCategory = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.name) update.slug = slugify(update.name, { lower: true });
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    const cat = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(cat);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const softDeleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() }, { new: true });
    res.json(cat);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const restoreCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, { isDeleted: false, deletedAt: null }, { new: true });
    res.json(cat);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
