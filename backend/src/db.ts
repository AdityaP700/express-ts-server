import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(' MONGODB_URI not found');
}

export const connectToDB = async (): Promise<void> => {
    //Added try and catch 
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1); 
  }
};
