import express from "express";
import { approveUser,userToApprove } from "../controllers/hrControllers";

const router = express.Router();

router.post("/approveUser", approveUser);
router.get("/getAdminToApprove", userToApprove);
router.get("/__health", (req, res) => {
  res.send("health check");
});

export default router;
