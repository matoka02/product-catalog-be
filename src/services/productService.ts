import { populate } from 'dotenv';
import { Product } from '../models/productModel';

type Params = {
  page: number;
  perPage: number;
  sortBy: string;
}

type Details = {
  id: string;
  color: string;
  capacity: string;
}

const getAll = async ({ page, perPage, sortBy }: Params) => {
  const offset = perPage * (page - 1);
  const order = sortBy === 'Newest' ? 'desc' : 'asc';

  const productsCollection = await Product.find()
    .populate('category')
    .populate('description')
    .sort({ updateAt: order, })
    .skip(offset)
    .limit(perPage);
  // const productsCollectionCount = await Product.count();
  const productsCollectionCount = await Product.countDocuments();

  const data = {
    totalProducts: productsCollectionCount,
    data: productsCollection,
  };

  return data;
}

const getOne = async (productId: string) => {
  const foundProduct = await Product.findById(productId)
    .populate('description')
    .populate('category');

  return foundProduct;
}

const getOneByDetails = async ({ id, color, capacity }: Details) => {
  const {
    namespaceId,
    capacity: oldCapacity,
    color: oldColor
  } = await Product.findById(id);

  console.log(color, capacity);

  if (capacity) {
    const product = await Product.findOne({
      namespaceId,
      capacity,
      color: oldColor,
    })
      .populate('category')
      .populate('description');

    console.log('Capacity', product);
    return product;
  }

  if (color) {
    const product = await Product.findOne({
      namespaceId,
      capacity: oldCapacity,
      color,
    })
      .populate('category')
      .populate('description');

    console.log('Color', product);
    return product;
  }

}

const getFiltered = async (query: string) => {
  const products = await Product.find({
    name: { $regex: query, $options: 'i' }
  })
    .populate('category')
    .populate('description');

  return products;
}

const allProducts = () => {
  return Product.find()
    .populate('category')
    .populate('description');
}

const getRandom = async (limit: number) => {
  const products = await allProducts();
  const randomProducts = [];
  const indexes: number[] = [];
  let i = 0;

  while (i < limit) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (indexes.includes(randomIndex)) {
      continue;
    } else {
      indexes.push(randomIndex);
      i++;
      randomProducts.push(products[randomIndex]);
    }
  };

  return randomProducts;
}

const getByType = async (type: string) => {
  switch (type) {
    case 'phones': {
      return Product.find()
        .populate({
          path: 'category',
          match: {
            name: 'phones',
          },
        })
        .populate('description');
    }

    case 'tablets': {
      return ['tablets'];
    }

    case 'accessories': {
      return ['accessories'];
    }

    default:
      return [];
  }
}

const getNew = async () => {
  const products = await allProducts()
    .sort({ createdAt: 'desc' })
    .limit(8);

  return products;
}



export default {
  getAll,
  getOne,
  getOneByDetails,
  getFiltered,
  getRandom,
  getByType,
  getNew,
};
