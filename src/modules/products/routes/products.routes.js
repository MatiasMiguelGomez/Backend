import { Router } from 'express';
import productControllers from '../controllers/product.controllers.js';
import { checkData } from '../middlewares/checkdata.middleware.js';
import { authorization } from '../../../middlewares/authorization.middleware.js';
import passport from 'passport';

const router = Router();

router.get('/', productControllers.getAllProducts);

router.get('/:pid', productControllers.getProduct);

router.post(
  '/',
  passport.authenticate('jwt'),
  authorization('admin'),
  checkData,
  productControllers.createProduct
);

router.put(
  '/:pid',
  passport.authenticate('jwt'),
  authorization('admin'),
  productControllers.updateProduct
);

router.delete(
  '/:pid',
  passport.authenticate('jwt'),
  authorization('admin'),
  productControllers.deleteProduct
);

export default router;
