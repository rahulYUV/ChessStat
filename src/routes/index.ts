import { Router } from "express";
import playerRoutes from "./player.routes";
import generalRoutes from "./general.routes";
import authRoutes from "./auth.routes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Player routes
router.use("/player", playerRoutes);

// General routes
router.use("/", generalRoutes);

export default router;
