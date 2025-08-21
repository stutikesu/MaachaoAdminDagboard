import express from "express";
import { 
  createOrder, 
  listOrders, 
  getOrder,           
  updateOrderStatus 
} from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// protect all routes
router.use(requireAuth);

// Orders
router.post("/", createOrder);          // create order with slot validation
router.get("/", listOrders);            // list all orders
router.get("/:id", getOrder);           // new: fetch single order
router.patch("/:id/status", updateOrderStatus); // update order status

export default router;
