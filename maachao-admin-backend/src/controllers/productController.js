import Product from "../models/Product.js";
import TimeSlot from "../models/TimeSlot.js";  
import slugify from "slugify";
import dayjs from "dayjs";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, meta, timeSlots } = req.body;
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const slug = slugify(name, { lower: true });

    // if admin passes slot IDs
    const slotIds = timeSlots ? JSON.parse(timeSlots) : [];

    const product = new Product({
      name,
      slug,
      description,
      price: Number(price || 0),
      category,
      subCategory: subCategory || null,
      images,
      meta: meta ? JSON.parse(meta) : {},
      timeSlots: slotIds
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// LIST PRODUCTS
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("category subCategory addons timeSlots")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// GET PRODUCT (filter only valid slots)
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("timeSlots");
    if (!product) return res.status(404).json({ message: "Not found" });

    const now = dayjs();

    // filter slots based on current time
    const validSlots = product.timeSlots.filter(
      slot => now.isBefore(dayjs(`${now.format("YYYY-MM-DD")}T${slot.end}`))
    );

    res.json({ ...product.toObject(), timeSlots: validSlots });
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// UPDATE PRODUCT (including slots)
export const updateProduct = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.name) update.slug = slugify(update.name, { lower: true });
    if (req.files && req.files.length) {
      const newImages = req.files.map(f => `/uploads/${f.filename}`);
      update.$push = { images: { $each: newImages } };
    }
    if (update.timeSlots) {
      update.timeSlots = JSON.parse(update.timeSlots); // slot IDs
    }

    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(product);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// SOFT DELETE
export const softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json(product);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// Attach slot to a product
export const attachSlotToProduct = async (req, res) => {
  try {
    const { id, slotId } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { $addToSet: { timeSlots: slotId } }, // avoids duplicates
      { new: true }
    ).populate("timeSlots");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove slot from product
export const removeSlotFromProduct = async (req, res) => {
  try {
    const { id, slotId } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { $pull: { timeSlots: slotId } },
      { new: true }
    ).populate("timeSlots");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
