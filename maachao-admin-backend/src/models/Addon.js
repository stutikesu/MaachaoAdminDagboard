import mongoose from "mongoose";

const AddonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  imageUrl: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}, { timestamps: true });

export default mongoose.model("Addon", AddonSchema);
