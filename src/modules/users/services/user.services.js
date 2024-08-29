import { createToken } from '../../../utils/jwt.js';
import userRepository from '../persistence/user.repository.js';
import { userDtoTransformer } from '../dto/user.dto.js';

const loginUser = user => {
  return createToken(user);
};

const findUser = async queries => {
  return await userRepository.findUser(queries);
};

const addUser = async user => {
  return await userRepository.addUser(user);
};

const userDtoServices = user => {
  return userDtoTransformer(user);
};

export default {
  loginUser,
  findUser,
  addUser,
  userDtoServices,
};
