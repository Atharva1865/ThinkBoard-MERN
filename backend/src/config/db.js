// This File helps in connecting to the Database
import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.error("MONGODB DID NOT CONNECT", error)
        process.exit(1)  // 1 means exited with Failure
    }
}