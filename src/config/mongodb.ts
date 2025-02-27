import mongoose from "mongoose";

export async function connectMongoDB(url:string) {
  try {
    await mongoose.connect(url);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
  }
}
