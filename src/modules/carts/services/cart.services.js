import productsServices from '../../products/services/products.services.js';
import cartRepository from '../persistence/cart.repository.js';
const createCart = async () => {
  return await cartRepository.createCart();
};

const findCartById = async id => {
  const cart = await cartRepository.getCartById(id);
  return cart;
};
const getProductsInCart = async id => {
  const findedProducts = await cartRepository.getProductsInCart(id);
  if (!findedProducts) throw new Error(`This cart doesn't exist`);
  return findedProducts;
};

const addProductInCart = async (cid, pid, quantity = 1) => {
  const cart = await cartRepository.getCartById(cid);

  const existingProductInCart = cart.products.find(p => p.product == pid);
  if (!existingProductInCart) {
    return await cartRepository.addProductInCart(pid, cid, quantity);
  } else {
    return await cartRepository.updateProductInCart(pid, cid, quantity);
  }
};

const deleteProductInCart = async (cid, pid, quantity = 1) => {
  return await cartRepository.deleteProductInCart(cid, pid, Number(quantity));
};

const deleteCart = async cid => {
  const cart = await cartRepository.getCartById(cid);
  if (!cart) throw new Error(`Cart doesn't exist`);
  return await cartRepository.deleteProducts(cid);
};

const purchase = async id => {
  const cart = await findCartById(id);

  let total = 0;
  let productsWithOutStock = [];

  for (const prod of cart.products) {
    const findedProduct = await productsServices.getProductById(prod.product);
    console.log(findedProduct, findedProduct._id);
    if (findedProduct.stock >= prod.quantity) {
      total += findedProduct.price * prod.quantity;
      console.log('id del producto', findedProduct);
      await productsServices.updateProduct(findedProduct._id, {
        stock: findedProduct.stock - prod.quantity,
      });
    } else {
      productsWithOutStock.push(prod);
    }
  }
  await cartRepository.updateCart(id, { products: productsWithOutStock });
  return total;
};

export default {
  findCartById,
  createCart,
  getProductsInCart,
  addProductInCart,
  deleteProductInCart,
  deleteCart,
  purchase,
};
