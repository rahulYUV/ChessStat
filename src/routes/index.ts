import { Router } from "express";
import playerRoutes from "./player.routes";
import generalRoutes from "./general.routes";

const router = Router();

router.use("/player", playerRoutes);
router.use("/", generalRoutes);

export default router;
