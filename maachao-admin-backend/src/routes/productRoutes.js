import express from "express";
import {
  createProduct, listProducts, getProduct, updateProduct, softDeleteProduct
} from "../controllers/productController.js";
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", upload.array("images", 6), createProduct);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.array("images", 6), updateProduct);
router.delete("/:id", softDeleteProduct);

export default router;
