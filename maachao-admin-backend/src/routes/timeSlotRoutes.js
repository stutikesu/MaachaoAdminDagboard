import express from "express";
import {
  createTimeSlot,
  listTimeSlots,
  getTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
} from "../controllers/timeSlotController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

// CRUD routes
router.post("/", createTimeSlot);
router.get("/", listTimeSlots);
router.get("/:id", getTimeSlot);
router.put("/:id", updateTimeSlot);
router.delete("/:id", deleteTimeSlot);

export default router;
