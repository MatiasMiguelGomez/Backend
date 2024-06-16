import { request, response } from 'express';

export const checkUpdates = (req = request, res = response, next) => {
  const { price, stock } = req.body;
  if (typeof price !== 'number' || typeof stock !== 'number') {
    res
      .status(400)
      .json({
        stats: 'error',
        message: `Las propiedades price y stock deben ser numeros`,
      });
  } else {
    next();
  }
};
