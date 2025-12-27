import { Router } from "express";
import { GeneralController } from "../controllers/general.controller";
import { PlayerController } from "../controllers/player.controller";

const router = Router();

router.get("/", GeneralController.getRoot);
router.get("/health", GeneralController.getHealth);
router.post("/cache/flush", GeneralController.flushCache);
router.post("/comments", GeneralController.postComment);
router.post("/visit", GeneralController.incrementVisit);
router.get("/visit", GeneralController.getVisit);

// Compare route is unique as it involves 2 players
router.get("/compare/:p1/:p2", PlayerController.comparePlayers);

export default router;
