import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Visitor } from "../models/Visitor";
import { Comment } from "../models/Comment";
import { cacheService } from "../services/cache.service";
import { handleError } from "../utils/helpers";

export class GeneralController {
    static getRoot(req: Request, res: Response) {
        res.json({
            message: "Chess Stats API",
            version: "1.0.0",
            endpoints: {
                player: "/player/:id",
                stats: "/player/:id/stats",
                full: "/player/:id/full",
                clubs: "/player/:id/clubs",
                matches: "/player/:id/matches",
                health: "/health"
            }
        });
    }

    static getHealth(req: Request, res: Response) {
        res.json({ status: "ok", timestamp: new Date().toISOString() });
    }

    static flushCache(req: Request, res: Response) {
        cacheService.flush();
        res.json({ message: "Cache flushed successfully" });
    }

    static async postComment(req: Request, res: Response) {
        try {
            const { comment } = req.body;
            if (!comment) {
                return res.status(400).json({ error: "Comment is required" });
            }

            const newComment = new Comment({ text: comment });
            await newComment.save();

            const logEntry = `${new Date().toISOString()}: ${comment}\n`;
            // NOTE: __dirname might behave differently in built code, but fine for ts-node/dev
            const projectRoot = path.resolve(__dirname, "../../"); // Adjust based on where this file is
            const filePath = path.join(projectRoot, "comment.txt");

            fs.appendFile(filePath, logEntry, (err) => {
                if (err) console.error("Error writing to local file:", err);
            });

            res.json({ message: "Comment saved successfully" });
        } catch (error) {
            console.error("Error saving comment:", error);
            res.status(500).json({ error: "Failed to save comment" });
        }
    }

    static async incrementVisit(req: Request, res: Response) {
        try {
            let visitor = await Visitor.findOne();
            if (!visitor) {
                visitor = new Visitor({ count: 0 });
            }
            visitor.count++;
            await visitor.save();
            res.json({ count: visitor.count });
        } catch (error) {
            console.error("Error incrementing visitor count:", error);
            res.status(500).json({ error: "Failed to increment visitor count" });
        }
    }

    static async getVisit(req: Request, res: Response) {
        try {
            let visitor = await Visitor.findOne();
            if (!visitor) {
                visitor = new Visitor({ count: 0 });
                await visitor.save();
            }
            res.json({ count: visitor.count });
        } catch (error) {
            console.error("Error getting visitor count:", error);
            res.status(500).json({ error: "Failed to get visitor count" });
        }
    }
}
