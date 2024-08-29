import ticketRepository from '../persistence/ticket.repository.js';
export const createTicket = async (total, email) => {
  try {
    const newUser = {
      purchaser: email,
      code: Math.random().toString(36).substr(2, 9),
      amount: total,
    };
    const ticket = await ticketRepository.create(newUser);
    return ticket;
  } catch (error) {
    throw new Error(error);
  }
};
