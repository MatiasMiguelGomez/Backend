import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchase_datatime: {
    type: Date,
    default: Date.now(),
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
