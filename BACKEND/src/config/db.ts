import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        const testUrl = `${connection.host} on port: ${connection.port}`
        console.log(`Connected to: ${testUrl}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}