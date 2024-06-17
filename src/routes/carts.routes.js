import { Router } from 'express';
import cartDAO from '../dao/mongoDB/cart.dao.js';
import productDAO from '../dao/mongoDB/product.dao.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const createdCart = await cartDAO.createCart();
    res.status(201).json(createdCart);
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;

    const findedProducts = await cartDAO.getProductInCart(cid);

    if (!findedProducts) {
      res.status(404).json({ status: 'error', message: "this cart id doesn't exist." });
    }
    res.status(200).json(findedProducts);
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const numbQuery = quantity ? Number(quantity) : 1;
    const product = await productDAO.getProductById(pid);
    if (!product) return res.status(404).json({ status: 'Error', message: 'Product doesnt exist' });
    const cart = await cartDAO.getCartById(cid);
    if (!cart) return res.status(404).json({ status: 'Error', message: 'Cart doesnt exist' });
    const productToCart = await cartDAO.pushProductInCart(cid, pid, numbQuery);
    res.status(201).json({ status: 'Success', Payload: productToCart });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const numbQuery = quantity ? Number(quantity) : 1;
    const product = await productDAO.getProductById(pid);
    if (!product) return res.status(404).json({ status: 'Error', message: 'Product doesnt exist' });
    const cart = await cartDAO.getCartById(cid);
    if (!cart) return res.status(404).json({ status: 'Error', message: 'Cart doesnt exist' });
    const restCart = await cartDAO.deleteProductInCart(cid, pid, numbQuery);
    res.status(201).json({ status: 'Success', Payload: restCart });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const numbQuery = quantity ? Number(quantity) : 1;
    const product = await productDAO.getProductById(pid);
    if (!product) return res.status(404).json({ status: 'Error', message: 'Product doesnt exist' });
    const cart = await cartDAO.getCartById(cid);
    if (!cart) return res.status(404).json({ status: 'Error', message: 'Cart doesnt exist' });
    const cartUpdate = await cartDAO.updateProductInCart(cid, pid, numbQuery);
    res.status(200).json({ status: 'Success', Payload: cartUpdate });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

//los endpoints de post put y delete de items dentro del carrito estan configurados para borrar de manera individual 1 a 1 los productos o tambien a borrar cantidades mayores si se lo pasamos por el body

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDAO.getCartById(cid);
    if (!cart) return res.status(404).json({ status: 'Error', message: 'Cart doesnt exist' });
    const cartEmpty = await cartDAO.deleteProducts(cid);
    res.status(200).json({ status: 'Success', Payload: cartEmpty });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});
export default router;
