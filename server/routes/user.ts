import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

router.get(
  "/admin",
  requireAuth,
  requireRole("Admin"),
  (req, res) => {
    const userId: string = req.user.id;
    const email: string = req.user.email;

    res.json({
      message: "Welcome Admin",
      user: {
        id: userId,
        email,
      },
    });
  }
);

router.get(
  "/client",
  requireAuth,
  requireRole("Client"),
  (req, res) => {
    const userId: string = req.user.id;
    const email: string = req.user.email;

    res.json({
      message: "Welcome Client",
      user: {
        id: userId,
        email,
      },
    });
  }
);

export default router;