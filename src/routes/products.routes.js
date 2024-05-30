import { Router } from 'express';
import ProductManager from '../managers/products.manager.js';
import { __dirname } from '../path.js';
import { checkData } from '../middlewares/checkdata.middleware.js';
import { checkUpdates } from '../middlewares/checkUpdates.middleware.js';

const router = Router();

const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(Number(limit));
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
      res
        .status(404)
        .json({ status: 'Error', message: "This product doesn't exist" });
    } else {
      res.status(200).json(product);
    }
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.post('/', checkData, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.createProduct(product);
    res.status(201).json({
      status: 'success',
      message: `The product ${newProduct.title} was added`,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.put('/:pid', checkUpdates, async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productManager.updateProduct(pid, product);
    if (!updatedProduct) {
      res
        .status(404)
        .json({ status: 'not Found', message: "this product doesn't exist" });
    }
    res.status(200).json({ updatedProduct });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);
    if (!deletedProduct) {
      res
        .status(404)
        .json({ status: 'not Found', message: "this product doesn't exist" });
    }
    res.status(200).json({
      status: 'success',
      message: 'this product has delete ',
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

export default router;
