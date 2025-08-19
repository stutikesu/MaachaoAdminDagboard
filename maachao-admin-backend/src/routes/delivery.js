import express from "express";
import {
  createSlot,
  getSlots,
  getSlotsByType,
  bookSlot,
} from "../controllers/delivery.controller.js";

const router = express.Router();

// Routes
router.post("/slots", createSlot);          // Create slot
router.get("/slots", getSlots);             // Get all slots
router.get("/slots/:type", getSlotsByType); // Get slots by type (URGENT/FIXED/NORMAL/MIDNIGHT)
router.post("/slots/book", bookSlot);       // Book a slot

export default router;
