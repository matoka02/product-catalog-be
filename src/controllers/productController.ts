/* eslint-disable max-len */
/* eslint-disable no-shadow */
import { Request, Response } from 'express';

import productService from '../services/productService';

const DEFAULT_LIMIT = 4;

const getAll = async (req: Request, resp: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const sortBy = String(req.query.sortBy) || 'Newest';

  try {
    const data = await productService.getAll({ page, perPage, sortBy });

    resp.status(200).send(data);
  } catch (error) {
    resp.status(500).send({
      data: null
    });
  };
};

const getOne = async (req: Request, resp: Response) => {
  const productId = req.params.id;

  try {
    const foundProduct = await productService.getOne(productId);

    if (foundProduct) {
      resp.status(200).send(foundProduct);
    } else {
      resp.status(404).send(`Not found id: ${foundProduct}`);
    }

  } catch (error) {
    resp.status(500).send('Error');
  };
};

interface ReqQuery {
  query: string;
}

const getFiltered = async (
  req: Request<{}, {}, {}, ReqQuery>,
  resp: Response,
) => {
  const { query } = req.query;

  try {
    const filteredProducts = await productService.getFiltered(query);

    if (filteredProducts.length) {
      resp.status(200).send(filteredProducts);
    } else {
      resp.status(404).send('Not found');
    }
  } catch {
    resp.status(500).send({
      data: null,
    });
  }
};

const getRecommended = async (
  _: Request,
  resp: Response,
) => {
  try {
    const randomProducts = await productService.getRandom(10);

    resp.status(200).send(randomProducts);
  } catch {
    resp.status(500).send('Error');
  }
};

const getByType = async (
  req: Request,
  resp: Response,
) => {
  const type = req.query.type as string;

  try {
    const productsByType = await productService.getByType(type);

    resp.status(200).send(productsByType);
  } catch {
    resp.status(500).send('Error');
  }
};


export default { getAll, getOne, getFiltered, getRecommended, getByType };
