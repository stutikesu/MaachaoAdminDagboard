
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },

  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
    price: Number,
    addons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Addon" }],

    // Attach delivery slot to each product item
    selectedSlot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" }
  }],

  totalAmount: { type: Number, default: 0 },

  status: { 
    type: String, 
    enum: ["pending","confirmed","in_progress","completed","cancelled"], 
    default: "pending" 
  },

  notes: String
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
