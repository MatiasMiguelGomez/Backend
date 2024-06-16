import { productModel } from './models/product.model.js';

const getAllProducts = async (query, filters) => {
  try {
    const products = await productModel.paginate(query, filters);
    return products;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
const getProductById = async id => {
  try {
    const product = await productModel.findById({ _id: id });
    return product;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const createProduct = async product => {
  try {
    const newProduct = await productModel.create(product);
    return newProduct;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, product, { new: true });
    return updatedProduct;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const deleteProduct = async id => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, { status: false });
    return updatedProduct;
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
