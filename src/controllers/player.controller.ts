import { Request, Response } from "express";
import { chessService } from "../services/chess.service";
import { handleError } from "../utils/helpers";

export class PlayerController {
    static async getPlayer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayer(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getPlayerStats(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayerStats(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getPlayerFull(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayerFull(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getPlayerClubs(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayerClubs(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getPlayerMatches(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayerMatches(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async comparePlayers(req: Request, res: Response) {
        try {
            const { p1, p2 } = req.params;
            if (!p1 || !p2) return res.status(400).json({ error: "Both player IDs are required" });

            const data = await chessService.comparePlayers(p1, p2);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getPlayerInsights(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ error: "Player ID is required" });

            const data = await chessService.getPlayerInsights(id);
            res.json(data);
        } catch (error) {
            handleError(res, error);
        }
    }
}
