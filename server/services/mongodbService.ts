import mongoose from 'mongoose';

// Service to connect to MongoDB
export const connectMongoService = async (uri: string) => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return;
        }
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
