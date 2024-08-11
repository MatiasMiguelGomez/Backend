import cartDAO from '../dao/cart.dao.js';
const createCart = async () => {
  return await cartDAO.createCart();
};

const findCartById = async id => {
  const cart = await cartDAO.getCartById(id);
  return cart;
};
const getProductsInCart = async id => {
  const findedProducts = await cartDAO.getProductsInCart(id);
  if (!findedProducts) throw new Error(`This cart doesn't exist`);
  return findedProducts;
};

const addProductInCart = async (cid, pid, quantity = 1) => {
  const cart = await cartDAO.getCartById(cid);

  const existingProductInCart = cart.products.find(p => p.product == pid);
  if (!existingProductInCart) {
    return await cartDAO.addProductInCart(pid, cid, quantity);
  } else {
    return await cartDAO.updateProductInCart(pid, cid, quantity);
  }
};

const deleteProductInCart = async (cid, pid, quantity = 1) => {
  return await cartDAO.deleteProductInCart(cid, pid, Number(quantity));
};

const deleteCart = async cid => {
  const cart = await cartDAO.getCartById(cid);
  if (!cart) throw new Error(`Cart doesn't exist`);
  return await cartDAO.deleteProducts(cid);
};

export default {
  findCartById,
  createCart,
  getProductsInCart,
  addProductInCart,
  deleteProductInCart,
  deleteCart,
};
