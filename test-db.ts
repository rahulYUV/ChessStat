import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    console.error("mongourl is  undefined");
    process.exit(1);
}

const testConnection = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const TestSchema = new mongoose.Schema({ message: String });
        const TestModel = mongoose.model("TestConnection", TestSchema);

        const testDoc = new TestModel({ message: "hello hello hello" });
        await testDoc.save();
        console.log("Test document saved");

        await TestModel.deleteMany({ message: "hello hello hello" });
        console.log("Test document cleaned");

        console.log("passed ");
    } catch (error) {
        console.error("Connection failed: 500", error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

testConnection();
