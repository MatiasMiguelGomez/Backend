import { request, response } from 'express';

export const checkData = (req = request, res = response, next) => {
  const { title, description, code, price, stock, category } = req.body;
  if (
    title === undefined ||
    description === undefined ||
    code === undefined ||
    (price === undefined && typeof price !== 'number') ||
    (stock === undefined && typeof stock !== 'number') ||
    category === undefined
  ) {
    res
      .status(400)
      .json({ status: 'Error', message: 'Los campos son requeridos' });
  } else {
    next();
  }
};
