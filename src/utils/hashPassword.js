import bcrypt from 'bcrypt';

export const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const validateHash = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};
