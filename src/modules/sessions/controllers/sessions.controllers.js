import { currentSession } from '../services/sessions.services.js';
export const current = async (req, res) => {
  const userDTO = currentSession(req.user);
  res.status(200).json({ status: 'Success', message: userDTO });
};
