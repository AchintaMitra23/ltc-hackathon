import express from "express";
import { createOrder } from "../controllers/hrControllers";
const router = express.Router();
router.post("/createOrder", createOrder);
router.get("/__health", (req, res) => {
    res.send("health check");
});
export default router;
