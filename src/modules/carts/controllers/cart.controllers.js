import cartServices from '../services/cart.services.js';
import { createTicket } from '../../tickets/services/ticket.services.js';
const createCart = async (req, res) => {
  try {
    const createdCart = await cartServices.createCart();
    res.status(201).json(createdCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};

const getProductsInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const findedProducts = await cartServices.getProductsInCart(cid);
    res.status(200).json({ status: 'Success', payload: findedProducts });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }
};

const addProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const productToCart = await cartServices.addProductInCart(cid, pid, quantity);
    res.status(201).json({ status: 'Success', Payload: productToCart });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const restCart = await cartServices.deleteProductInCart(cid, pid, quantity);
    res.status(201).json({ status: 'Success', Payload: restCart });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartEmpty = await cartServices.deleteCart(cid);
    res.status(200).json({ status: 'Success', Payload: cartEmpty });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      {
        res.status(500).json({ status: 'Error', message: `Internal Server Error` });
      }
    }
  }
};

const purchase = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.findCartById(cid);
    if (!cart) return res.status(404).json({ status: 'Error', message: 'Cart not found' });
    const total = await cartServices.purchase(cid);
    const ticket = await createTicket(total, req.user.email);
    return res.status(200).json({ status: 'Success', payload: ticket });
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  createCart,
  getProductsInCart,
  addProductInCart,
  deleteProductInCart,
  deleteCart,
  purchase,
};
