import TimeSlot from "../models/TimeSlot.js";

// Create slot
export const createTimeSlot = async (req, res) => {
  try {
    const slot = new TimeSlot(req.body);
    await slot.save();
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all slots
export const listTimeSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find({ isActive: true }).sort({ start: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single slot
export const getTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update slot
export const updateTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Soft delete slot
export const deleteTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
