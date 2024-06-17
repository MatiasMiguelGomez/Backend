import { Router } from 'express';
import { __dirname } from '../path.js';
import productDao from '../dao/mongoDB/product.dao.js';

const router = Router();

router.get('/', async (req, res) => {
  console.log('Se ha accedido a la ruta /api/handlebars');
  try {
    const products = await productDao.getAllProducts();
    res.render('home', { products });
  } catch (error) {
    console.error(error);
  }
});
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimehandlebars');
});

export default router;
