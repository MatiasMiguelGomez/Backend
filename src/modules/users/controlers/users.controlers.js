import userServices from '../services/user.services.js';
const registerUser = async (req, res) => {
  const resUserDto = userServices.userDtoServices(req.user);
  res.status(201).json({ status: 'success', payload: resUserDto });
};

const loginUser = async (req, res) => {
  const token = userServices.loginUser(req.user);
  const resUserDto = userServices.userDtoServices(req.user);
  res.cookie('token', token);
  res.status(200).json({ status: 'success', payload: resUserDto, token });
};

export default {
  registerUser,
  loginUser,
};
