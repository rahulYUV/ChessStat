import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 99 }
});

export const Visitor = mongoose.model("Visitor", visitorSchema);
