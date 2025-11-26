import express, { Request, Response } from "express";
import cors from "cors";
// @ts-ignore
import ChessWebAPI from "chess-web-api";

const app = express();
const port = 3000;

const chessAPI = new ChessWebAPI();

app.use(cors());
app.use(express.json());

// Helper function for error handling
const handleError = (res: Response, error: any) => {
    const statusCode = error.statusCode || 500;
    const message = error.body || error;
    res.status(statusCode).send(message);
};

// Get player profile
app.get("/player/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await chessAPI.getPlayer(id);
        res.send(player.body);
    } catch (error) {
        handleError(res, error);
    }
});

// Get player stats
app.get("/player/:id/stats", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const stats = await chessAPI.getPlayerStats(id);
        res.send(stats.body);
    } catch (error) {
        handleError(res, error);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
