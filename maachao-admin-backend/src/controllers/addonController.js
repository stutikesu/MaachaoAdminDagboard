import Addon from "../models/Addon.js";

export const createAddon = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const addon = new Addon({ name, description, price: Number(price || 0), imageUrl });
    await addon.save();
    res.status(201).json(addon);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listAddons = async (req, res) => {
  try {
    const items = await Addon.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateAddon = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    const addon = await Addon.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(addon);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const softDeleteAddon = async (req, res) => {
  try {
    const addon = await Addon.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() }, { new: true });
    res.json(addon);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
