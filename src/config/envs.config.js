import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  SECRET_CODE: process.env.SECRET_CODE,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
};
