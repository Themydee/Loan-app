import mongoose from "mongoose"

export const db = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("🛰️ MongoDB connected successfully");
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`)
        process.exit(1)
    }
}