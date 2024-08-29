import productRepository from '../persistence/product.repository.js';
import productDto from '../dto/product.dto.js';

const getAllProducts = async ({ limit, page, sort, category }) => {
  //creacion del objeto filters, con valores default si el usuario no ingresa los valores
  const filters = {
    limit: limit || 10,
    page: page || 1,
    sort: {
      price: sort === 'asc' ? 1 : -1,
    },
    lean: true,
  };
  const query = { status: true };
  // por defecto solo traemos los objetos con status en true, en caso de que el usuario tambien agregue la categoria se le suma al objeto query la propiedad de category
  if (category) query.category = category;
  const products = await productRepository.getAllProducts(query, filters);
  return productDto.resAllProduct(products);
};

const getProductById = async id => {
  const product = await productRepository.getProductById(id);
  if (!product) throw new Error("this product doesn't exist");
  return productDto.resProductDTO(product);
};

const createProduct = async product => {
  return await productRepository.createProduct(product);
};

const updateProduct = async (id, product) => {
  const existingProduct = await getProductById(id);
  if (!existingProduct) throw new Error("this product doesn't exist");
  const productUpdated = await productRepository.updateProduct(id, product);
  return productDto.resProductDTO(productUpdated);
};

const deleteProduct = async id => {
  const product = getProductById(id);
  if (!product) throw new Error("this product doesn't exist");
  return await productRepository.deleteProduct(id);
};
export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
