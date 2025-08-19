import mongoose from "mongoose";

const deliverySlotSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["URGENT", "FIXED", "NORMAL", "MIDNIGHT"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String, // Example: "10:00"
    required: true,
  },
  endTime: {
    type: String, // Example: "12:00"
    required: true,
  },
  gap: {
    type: String, // Example: "2 HOUR", "4 HOUR"
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const DeliverySlot = mongoose.model("DeliverySlot", deliverySlotSchema);

export default DeliverySlot;
