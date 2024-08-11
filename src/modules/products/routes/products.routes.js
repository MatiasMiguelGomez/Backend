import { Router } from 'express';
import productControllers from '../controllers/product.controllers.js';
import { checkData } from '../middlewares/checkdata.middleware.js';

const router = Router();

router.get('/', productControllers.getAllProducts);

router.get('/:pid', productControllers.getProduct);

router.post('/', checkData, productControllers.createProduct);

router.put('/:pid', productControllers.updateProduct);

router.delete('/:pid', productControllers.deleteProduct);

export default router;
