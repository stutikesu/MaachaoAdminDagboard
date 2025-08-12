import express from "express";
import { createOrder, listOrders, updateOrderStatus } from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", createOrder);
router.get("/", listOrders);
router.patch("/:id/status", updateOrderStatus);

export default router;
