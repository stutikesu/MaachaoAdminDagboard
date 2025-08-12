import express from "express";
import { createAddon, listAddons, updateAddon, softDeleteAddon } from "../controllers/addonController.js";
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", upload.single("image"), createAddon);
router.get("/", listAddons);
router.put("/:id", upload.single("image"), updateAddon);
router.delete("/:id", softDeleteAddon);

export default router;
