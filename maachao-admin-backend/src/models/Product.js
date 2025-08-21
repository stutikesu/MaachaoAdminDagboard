import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  description: String,
  price: { type: Number, default: 0 },
  images: [String],
  addons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Addon" }],

  // ⬇️ Attach multiple slots to this product
  timeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" }],

  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}, { timestamps: true });

// Full-text search on name + description
ProductSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", ProductSchema);
