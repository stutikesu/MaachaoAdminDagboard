import express from "express";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  softDeleteProduct,
  attachSlotToProduct,
  removeSlotFromProduct
} from "../controllers/productController.js";   // ⬅️ now same controller
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

// Product CRUD
router.post("/", upload.array("images", 6), createProduct);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.array("images", 6), updateProduct);
router.delete("/:id", softDeleteProduct);

// Product ↔ Slot management
router.post("/:id/slots/:slotId", attachSlotToProduct);
router.delete("/:id/slots/:slotId", removeSlotFromProduct);

export default router;
