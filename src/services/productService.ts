import { Product } from '../models/productModel';

type Params = {
  page: number;
  perPage: number;
  sortBy: string;
}

const getAll = async ({ page, perPage, sortBy }: Params) => {
  const offset = perPage * (page - 1);
  const order = sortBy === 'Newest' ? 'desc' : 'asc';

  const productsCollection = await Product
    .find()
    .populate('category')
    .populate('description')
    .sort({ updateAt: order, })
    .skip(offset)
    .limit(perPage);
  const productsCollectionCount = await Product.count();

  const data = {
    totalProducts: productsCollectionCount,
    data: productsCollection,
  };

  return data;
}

const getOne = async (productId: string) => {
  const foundProduct = await Product
    .findById(productId)
    .populate('description')
    .populate('category');

  return foundProduct;
}

export default { getAll, getOne };
