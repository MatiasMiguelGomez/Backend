import { Router } from 'express';
import productModel from '../dao/mongoDB/product.dao.js';
import { checkData } from '../middlewares/checkdata.middleware.js';
import { checkUpdates } from '../middlewares/checkUpdates.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, category } = req.query;
    const filters = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === 'asc' ? 1 : -1,
      },
      lean: true,
    };
    const query = { status: true };

    if (category) query.category = category;

    const products = await productModel.getAllProducts(query, filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.getProductById(pid);
    if (!product) {
      res.status(404).json({ status: 'Error', message: "This product doesn't exist" });
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
    const newProduct = await productModel.createProduct(product);
    res.status(201).json({
      status: 'success',
      message: `The product ${newProduct.title} was added`,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productModel.updateProduct(pid, product);
    if (!updatedProduct) {
      res.status(404).json({ status: 'not Found', message: "this product doesn't exist" });
    }
    res.status(200).json({ updatedProduct });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productModel.deleteProduct(pid);
    if (!deletedProduct) {
      res.status(404).json({ status: 'not Found', message: "this product doesn't exist" });
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
