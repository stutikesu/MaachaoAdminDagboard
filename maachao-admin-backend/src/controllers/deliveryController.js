import DeliverySlot from "../models/delivery.js";

// ✅ Create a delivery slot
export const createSlot = async (req, res) => {
  try {
    const slot = new DeliverySlot(req.body);
    await slot.save();
    res.status(201).json({ message: "Slot created successfully", slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all slots
export const getSlots = async (req, res) => {
  try {
    const slots = await DeliverySlot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get slots by type
export const getSlotsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const slots = await DeliverySlot.find({ type: type.toUpperCase() });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Book a slot
export const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await DeliverySlot.findById(slotId);
    if (!slot || !slot.isAvailable) {
      return res.status(400).json({ error: "Slot not available" });
    }

    slot.isAvailable = false;
    await slot.save();

    res.json({ message: "Slot booked successfully", slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
