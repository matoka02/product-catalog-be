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
      resp.status(200).json(foundProduct);
    } else {
      resp.status(404).send(`Not found id: ${foundProduct}`);
    }

  } catch (error) {
    resp.status(500).send('Error');
  };
};

export default { getAll, getOne };
