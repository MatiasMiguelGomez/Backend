import productServices from '../services/products.services.js';
const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAllProducts(req.query);
    res.status(200).json({ status: 'Success', payload: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal error server' });
  }
};
const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productServices.getProductById(pid);
    res.status(200).json({ status: 'Success', payload: product });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal error server' });
    }
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productServices.createProduct(product);
    res.status(201).json({
      status: 'Success',
      message: `The product ${newProduct.title} was added`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal error server' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productServices.updateProduct(pid, product);
    res.status(200).json({ status: 'Success', payload: updatedProduct });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal error server' });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    await productServices.deleteProduct(pid);

    res.status(200).json({
      status: 'Success',
      message: 'this product has delete ',
    });
  } catch (error) {
    if (error.message) {
      res.status(404).json({ status: 'Error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal error server' });
    }
  }
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
