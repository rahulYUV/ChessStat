import { Router } from "express";
import { PlayerController } from "../controllers/player.controller";

const router = Router();

router.get("/:id", PlayerController.getPlayer);
router.get("/:id/stats", PlayerController.getPlayerStats);
router.get("/:id/full", PlayerController.getPlayerFull);
router.get("/:id/clubs", PlayerController.getPlayerClubs);
router.get("/:id/matches", PlayerController.getPlayerMatches);
router.get("/:id/insights", PlayerController.getPlayerInsights);

export default router;
