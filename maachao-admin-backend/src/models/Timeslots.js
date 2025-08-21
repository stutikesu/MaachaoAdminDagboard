import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. "10am - 12pm"
  start: { type: String, required: true }, // "10:00"
  end: { type: String, required: true },   // "12:00"
  gapInHours: { type: Number, required: true }, // 2h, 4h etc.
  price: { type: Number, default: 0 },     // delivery fee
  active: { type: Boolean, default: true },
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
export default TimeSlot;
