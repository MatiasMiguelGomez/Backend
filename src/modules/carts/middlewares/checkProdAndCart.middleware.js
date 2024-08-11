import productsServices from '../../products/services/products.services.js';
import cartServices from '../services/cart.services.js';
export const checkProdAndCart = async (req, res, next) => {
  try {
    const { pid, cid } = req.params;
    const product = await productsServices.getProductById(pid);
    if (!product) throw new Error(`Product doesn't exist`);
    const cart = await cartServices.findCartById(cid);
    if (!cart) throw new Error(`Cart doesn't exist`);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};
