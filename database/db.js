import "dotenv/config";
import mongoose from "mongoose";

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI);
}

export default connectToDatabase