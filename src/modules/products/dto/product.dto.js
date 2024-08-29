const resProductDTO = product => {
  return {
    title: product.title,
    description: product.description,
    stock: product.stock,
    price: product.price,
    _id: product._id,
  };
};

const resAllProduct = ({ docs, ...resPaginate }) => {
  let resDTO = [];
  for (let prod in docs) {
    const newProd = {
      title: docs[prod].title,
      description: docs[prod].description,
      stock: docs[prod].stock,
      price: docs[prod].price,
    };
    resDTO.push(newProd);
  }
  return {
    docs: resDTO,
    ...resPaginate,
  };
};

export default {
  resProductDTO,
  resAllProduct,
};
