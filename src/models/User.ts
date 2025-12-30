import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
    chessUsername?: string;
    role: "user" | "admin";
    preferences: {
        favoriteOpenings: string[];
        savedPlayers: string[];
        theme?: "light" | "dark";
    };
    refreshTokens: string[];
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            default: null,
        },
        chessUsername: {
            type: String,
            default: null,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        preferences: {
            favoriteOpenings: {
                type: [String],
                default: [],
            },
            savedPlayers: {
                type: [String],
                default: [],
            },
            theme: {
                type: String,
                enum: ["light", "dark"],
                default: "dark",
            },
        },
        refreshTokens: {
            type: [String],
            default: [],
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ createdAt: -1 });

export const User = mongoose.model<IUser>("User", userSchema);
