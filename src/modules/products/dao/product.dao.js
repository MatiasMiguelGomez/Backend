import { productModel } from '../models/product.model.js';

const getAllProducts = async (query, filters) => {
  try {
    return await productModel.paginate(query, filters);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
const getProductById = async id => {
  try {
    return await productModel.findById({ _id: id });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const createProduct = async product => {
  try {
    return await productModel.create(product);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const updateProduct = async (id, product) => {
  try {
    return await productModel.findByIdAndUpdate({ _id: id }, product, { new: true });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const deleteProduct = async id => {
  try {
    return await productModel.findByIdAndUpdate({ _id: id }, { status: false });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
