import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_URL = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PRO;
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }
        await mongoose.connect(`${MONGO_URL}/tyre`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectDB;
