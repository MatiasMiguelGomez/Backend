import { Router } from 'express';
import products from './products.routes.js';
import carts from './carts.routes.js';
import views from './views.routes.js';
const router = Router();

router.use('/products', products);
router.use('/carts', carts);
router.use('/views', views);

export default router;
