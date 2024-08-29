import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js';

export const createToken = user => {
  const { _id, email, last_name, first_name } = user;
  return jwt.sign({ _id, email, last_name, first_name }, envs.JWT_SECRET_CODE, {
    expiresIn: '20m',
  });
};

export const validateToken = token => {
  const decode = jwt.verify(token, envs.JWT_SECRET_CODE);
  return decode;
};
