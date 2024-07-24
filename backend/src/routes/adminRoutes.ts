import express from "express";
import { getAllOrders,updateOrderStatus } from "../controllers/adminControllers";

const router = express.Router();

router.post("/getAllOrders", getAllOrders);
router.post("/orders/updateOrders", updateOrderStatus);
router.get("/__health", (req, res) => {
  res.send("health check");
});

export default router;
