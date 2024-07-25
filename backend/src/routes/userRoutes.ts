import express from "express";
import { createOrder,allOrdersOfUser,DateOrders } from "../controllers/userControllers";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/allOrders/:empId", allOrdersOfUser);
router.post("/allDateOrders", DateOrders);
router.get("/__health", (req, res) => {
  res.send("health check");
});

export default router;
