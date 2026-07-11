import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();
router.get(
  "/admin",
  requireAuth,
  requireRole("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/client",
  requireAuth,
  requireRole("Client"),
  (req, res) => {
    res.json({
      message: "Welcome Client",
    });
  }
);
export default router; //check1