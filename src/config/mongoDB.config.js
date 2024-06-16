import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.connect(
      'mongodb+srv://Matii:CoderPractica@cluster0.xky9wjf.mongodb.net/'
    );
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
