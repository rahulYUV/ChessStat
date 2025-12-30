import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/User";

export interface TokenPayload {
    userId: string;
    email: string;
    role: "user" | "admin";
}

export interface DecodedToken extends TokenPayload {
    iat: number;
    exp: number;
}

/**
 * Generate Access Token (short-lived)
 */
export const generateAccessToken = (user: IUser): string => {
    const payload: TokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error("JWT_ACCESS_SECRET is not defined");
    }

    const options: any = {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
    };

    return jwt.sign(payload, secret, options);
};

/**
 * Generate Refresh Token (long-lived)
 */
export const generateRefreshToken = (user: IUser): string => {
    const payload: TokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error("JWT_REFRESH_SECRET is not defined");
    }

    const options: any = {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
    };

    return jwt.sign(payload, secret, options);
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token: string): DecodedToken => {
    try {
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) {
            throw new Error("JWT_ACCESS_SECRET is not defined");
        }
        return jwt.verify(token, secret) as DecodedToken;
    } catch (error) {
        throw new Error("Invalid or expired access token");
    }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token: string): DecodedToken => {
    try {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw new Error("JWT_REFRESH_SECRET is not defined");
        }
        return jwt.verify(token, secret) as DecodedToken;
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};

/**
 * Generate both tokens at once
 */
export const generateTokenPair = (
    user: IUser
): { accessToken: string; refreshToken: string } => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
    };
};
