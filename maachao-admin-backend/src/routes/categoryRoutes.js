import express from "express";
import {
  createCategory, listCategories, getCategory, updateCategory, softDeleteCategory, restoreCategory
} from "../controllers/categoryController.js";
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", upload.single("image"), createCategory);
router.get("/", listCategories);
router.get("/:id", getCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", softDeleteCategory);
router.patch("/:id/restore", restoreCategory);

export default router;
