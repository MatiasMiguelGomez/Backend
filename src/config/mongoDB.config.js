import mongoose from 'mongoose';
import envs from './envs.config.js';

export const connectMongoDB = async () => {
  try {
    mongoose.connect(envs.MONGO_URL);
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
