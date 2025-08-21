import Order from "../models/Order.js";
import TimeSlot from "../models/TimeSlot.js";
import dayjs from "dayjs";

// CREATE ORDER with slot validation
export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount, notes } = req.body;

    //  Validate slots for each product in order
    for (let item of items) {
      if (item.selectedSlot) {
        const slot = await TimeSlot.findById(item.selectedSlot);
        if (!slot) {
          return res.status(400).json({ message: "Invalid delivery slot" });
        }

        // compare against current time
        const now = dayjs();
        const slotEnd = dayjs(`${now.format("YYYY-MM-DD")}T${slot.end}`);
        if (now.isAfter(slotEnd)) {
          return res.status(400).json({
            message: `Slot "${slot.label}" expired. Please select a new slot.`,
          });
        }
      }
    }

    // Save order if all slots valid
    const order = new Order({ customer, items, totalAmount, notes });
    await order.save();
    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LIST ALL ORDERS
export const listOrders = async (req, res) => {
  try {
    const items = await Order.find()
      .populate("customer items.product items.addons items.selectedSlot")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("customer items.product items.selectedSlot");
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE ORDER
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer items.product items.addons items.selectedSlot");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
