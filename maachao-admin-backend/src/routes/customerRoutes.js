import express from "express";
import { createCustomer, listCustomers, updateCustomer } from "../controllers/customerController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", createCustomer);
router.get("/", listCustomers);
router.put("/:id", updateCustomer);

export default router;
