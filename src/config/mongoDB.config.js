import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.connect('');
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
