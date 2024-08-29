import { ticketModel } from './models/ticket.model.js';

const create = async data => {
  return await ticketModel.create(data);
};
const find = async id => {
  return await ticketModel.findById(id);
};
const update = async (id, data) => {
  return await ticketModel.findByIdAndUpdate(id, data);
};
const deleteTicket = async id => {
  return await ticketModel.findOneAndDelete(id);
};

export default {
  create,
  find,
  update,
  deleteTicket,
};
