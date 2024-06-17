import { cartModel } from './models/cart.model.js';

const getProductInCart = async cid => {
  try {
    const findedCart = await cartModel.findById(cid).populate('products.product');
    if (!findedCart) return { cart: false };
    return findedCart.products;
  } catch (error) {
    console.log(`Error:${error}`);
  }
};

const getCartById = async cid => {
  try {
    const cart = await cartModel.findById(cid);
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

const pushProductInCart = async (cid, pid, numbQuery) => {
  try {
    const cart = await getCartById(cid);
    const productInCart = cart.products.find(p => p.product == pid);
    if (!productInCart) {
      cart.products.push({ product: pid, quantity: numbQuery });
    } else {
      productInCart.quantity += numbQuery;
    }
    cart.save();
    return cart;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const deleteProductInCart = async (cid, pid, numbQuery) => {
  try {
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

const updateProductInCart = async (cid, pid, numbQuery) => {
  try {
    const cart = await getCartById(cid);
    cart.products = cart.products.map(p => {
      if (p.product == pid) {
        p.quantity = numbQuery;
      }
      return p;
    });
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
  getProductInCart,
  createCart,
  getCartById,
  pushProductInCart,
  deleteProductInCart,
  deleteProducts,
  updateProductInCart,
};
