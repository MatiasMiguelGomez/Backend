import { cartModel } from '../models/cart.model.js';

const getProductsInCart = async cid => {
  try {
    const findedCart = await cartModel.findById(cid).populate('products.product');
    if (!findedCart) throw new Error("cart doesn't exist");
    return findedCart.products;
  } catch (error) {
    console.log(`Error in DAO: ${error.message}`);
    throw error;
  }
};

const getCartById = async cid => {
  try {
    const cart = await cartModel.findOne({ _id: cid });
    return cart;
  } catch (error) {
    console.error(`Error:${error}`);
  }
};

const createCart = async () => {
  try {
    const newCart = await cartModel.create({});
    return newCart;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

const updateCart = async (id, prod) => {
  return await cartModel.findByIdAndUpdate(id, prod);
};

const addProductInCart = async (pid, cid, quantity) => {
  const cart = await cartModel.findOne({ _id: cid });
  cart.products.push({ product: pid, quantity: quantity });
  cart.save();
  return cart;
};

const updateProductInCart = async (pid, cid, quantity) => {
  const cart = await cartModel.findOne({ _id: cid });
  cart.products = cart.products.map(p => {
    if (p.product == pid) {
      p.quantity += quantity;
    }
    return p;
  });
  await cart.save();
  return cart;
};

const deleteProductInCart = async (cid, pid, numbQuery) => {
  try {
    //preguntar al profe si esta bien tener logica de este tipo en el dao
    const cart = await getCartById(cid);
    cart.products = cart.products
      .map(p => {
        if (p.product == pid) {
          if (p.quantity > numbQuery) {
            p.quantity -= numbQuery;
          } else {
            return null;
          }
        }
        return p;
      })
      .filter(p => p.product !== null);
    await cart.save();
    return cart;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

const deleteProducts = async cid => {
  try {
    const cart = await getCartById(cid);
    cart.products = [];
    await cart.save();
    return cart;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

export default {
  updateCart,
  getProductsInCart,
  createCart,
  getCartById,
  addProductInCart,
  deleteProductInCart,
  deleteProducts,
  updateProductInCart,
};
