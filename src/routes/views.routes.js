import { Router } from 'express';
import { __dirname } from '../path.js';
import ProductManager from '../dao/fileSystem/products.manager.js';

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/', async (req, res) => {
  console.log('Se ha accedido a la ruta /api/handlebars');
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    console.error(error);
  }
});
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimehandlebars');
});

export default router;
