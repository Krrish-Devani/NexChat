import mongoose from 'mongoose';
import { wrapAsync } from './wrapAsync.js';

const connectDB = wrapAsync(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB is connected successfully');
});

export default connectDB;