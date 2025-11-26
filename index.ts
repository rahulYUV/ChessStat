import express, { Request, Response } from "express";
import cors from "cors";

import ChessWebAPI from "chess-web-api";

const app = express();
const port = process.env.PORT || 3000;

const chessAPI = new ChessWebAPI();

app.use(cors());
app.use(express.json());


const handleError = (res: Response, error: any) => {
    const statusCode = error.statusCode || 500;
    const message = error.body || error.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
};

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Chess Stats API",
        version: "1.0.0",
        endpoints: {
            player: "/player/:id",
            stats: "/player/:id/stats",
            health: "/health"
        }
    });
});

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/player/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Player ID is required" });
        }
        const player = await chessAPI.getPlayer(id);
        res.json(player.body);
    } catch (error) {
        handleError(res, error);
    }
});

app.get("/player/:id/stats", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Player ID is required" });
        }
        const stats = await chessAPI.getPlayerStats(id);
        res.json(stats.body);
    } catch (error) {
        handleError(res, error);
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
    console.log(`Chess Stats API listening on port ${port}`);
});

export default app;
