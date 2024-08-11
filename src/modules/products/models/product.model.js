import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'product';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
  code: { type: String, index: true },
  thumbails: {
    type: Array,
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
