import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

/**
 * Middleware to verify JWT access token
 * Protects routes that require authentication
 */
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Access token is required" });
            return;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = verifyAccessToken(token);

        // Attach user info to request object
        (req as any).user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error: any) {
        console.error("Auth middleware error:", error.message);
        res.status(401).json({
            error: "Invalid or expired token",
            message: error.message,
        });
    }
};

/**
 * Middleware to check if user is admin
 * Must be used after authMiddleware
 */
export const adminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const user = (req as any).user;

        if (!user || user.role !== "admin") {
            res.status(403).json({ error: "Admin access required" });
            return;
        }

        next();
    } catch (error: any) {
        console.error("Admin middleware error:", error.message);
        res.status(403).json({ error: "Admin access required" });
    }
};

/**
 * Optional auth middleware - doesn't block if no token provided
 * Useful for routes that work for both authenticated and unauthenticated users
 */
export const optionalAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.substring(7);
            const decoded = verifyAccessToken(token);

            (req as any).user = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
        }

        next();
    } catch (error) {
        // Silently fail - continue without user info
        next();
    }
};
