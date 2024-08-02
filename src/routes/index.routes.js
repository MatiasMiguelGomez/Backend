import { Router } from 'express';
import products from './products.routes.js';
import carts from './carts.routes.js';
import user from './user.routes.js';
import sessions from './sessions.routes.js';

const router = Router();

router.use('/products', products);
router.use('/carts', carts);
router.use('/user', user);
router.use('/sessions', sessions);

export default router;
