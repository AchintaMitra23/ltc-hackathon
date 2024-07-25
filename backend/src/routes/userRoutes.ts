import express from "express";
import { createOrder,allOrdersofUser } from "../controllers/userControllers";

const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/allOrders/:empId", allOrdersofUser);
router.get("/__health", (req, res) => {
  res.send("health check");
});

export default router;
