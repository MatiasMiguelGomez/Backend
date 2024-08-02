import mongoose from 'mongoose';

const userColletion = 'user';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    require: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const userModel = new mongoose.model(userColletion, userSchema);
