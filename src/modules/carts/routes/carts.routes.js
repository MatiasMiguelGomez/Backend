import { Router } from 'express';
import cartControllers from '../controllers/cart.controllers.js';
import { checkProdAndCart } from '../middlewares/checkProdAndCart.middleware.js';
import { authorization } from '../../../middlewares/authorization.middleware.js';
import passport from 'passport';

const router = Router();

router.post('/', cartControllers.createCart);

router.get('/:cid', cartControllers.getProductsInCart);

router.post(
  '/:cid/products/:pid',
  passport.authenticate('jwt'),
  authorization('user'),
  checkProdAndCart,
  cartControllers.addProductInCart
);

router.delete('/:cid/products/:pid', checkProdAndCart, cartControllers.deleteProductInCart);

router.delete('/:cid', cartControllers.deleteCart);

router.get(
  '/:cid/purchase',
  passport.authenticate('jwt'),
  authorization('user'),
  cartControllers.purchase
);
export default router;
