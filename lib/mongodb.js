// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/apeksha";
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    isConnected = false;
    // Don't throw error, just log it for development
    console.warn("⚠️ MongoDB not available - using fallback mode");
  }
}
