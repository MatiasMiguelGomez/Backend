import { Router } from 'express';
import products from '../modules/products/routes/products.routes.js';
import carts from '../modules/carts/routes/carts.routes.js';
import user from '../modules/users/routes/user.routes.js';
import sessions from '../modules/sessions/routes/sessions.routes.js';

const router = Router();

router.use('/products', products);
router.use('/carts', carts);
router.use('/user', user);
router.use('/sessions', sessions);

export default router;
