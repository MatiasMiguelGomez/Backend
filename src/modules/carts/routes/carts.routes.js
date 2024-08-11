import { Router } from 'express';
import cartControllers from '../controllers/cart.controllers.js';
import { checkProdAndCart } from '../middlewares/checkProdAndCart.middleware.js';

const router = Router();

router.post('/', cartControllers.createCart);

router.get('/:cid', cartControllers.getProductsInCart);

router.post('/:cid/products/:pid', checkProdAndCart, cartControllers.addProductInCart);

router.delete('/:cid/products/:pid', checkProdAndCart, cartControllers.deleteProductInCart);

//los endpoints de post put y delete de items dentro del carrito estan configurados para borrar de manera individual 1 a 1 los productos o tambien a borrar cantidades mayores si se lo pasamos por el body

router.delete('/:cid', cartControllers.deleteCart);
export default router;
