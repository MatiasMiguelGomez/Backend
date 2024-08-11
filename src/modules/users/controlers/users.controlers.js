import userServices from '../services/user.services.js';
const registerUser = async (req, res) => {
  res.status(201).json({ status: 'success', payload: req.user });
};

const loginUser = async (req, res) => {
  const token = userServices.loginUser(req.user);

  res.cookie('token', token);
  res.status(200).json({ status: 'success', payload: req.user, token });
};

export default {
  registerUser,
  loginUser,
};
