import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || "";

    if (!MONGODB_URI) {
        console.warn("MongoDB URI is missing. db ops will failed .");
    } else {
        mongoose.connect(MONGODB_URI)
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => {
                console.error("MongoDB connection failed (Server will verify run without DB):", err.message);
            });
    }
};
