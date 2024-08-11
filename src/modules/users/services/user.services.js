import { createToken } from '../../../utils/jwt.js';
import userDao from '../dao/user.dao.js';
const loginUser = user => {
  return createToken(user);
};

const findUser = async queries => {
  return await userDao.findUser(queries);
};

const addUser = async user => {
  return await userDao.addUser(user);
};
export default {
  loginUser,
  findUser,
  addUser,
};
