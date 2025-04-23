/* eslint-disable max-len */
/* eslint-disable no-shadow */
import { Request, Response } from 'express';

import productService from '../services/productService';

const DEFAULT_LIMIT = 8;

const getAll = async (req: Request, resp: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || DEFAULT_LIMIT;
  const sortBy = String(req.query.sortBy) || 'Newest';
  const type = (req.query.type as string) || 'phones';

  try {
    const data = await productService.getAll({ page, perPage, sortBy, type });

    resp.status(200).send(data);
  } catch (error) {
    console.error(error);
    resp.status(500).send(error);
  }
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
  }
};

const getOneByDetails = async (req: Request, resp: Response) => {
  const color = req.query.color as string;
  const capacity = req.query.capacity as string;
  const { id } = req.params;

  try {
    const products = await productService.getOneByDetails({
      id,
      color,
      capacity,
    });

    resp.status(200).send(products);
  } catch (error) {
    resp.status(500).send({
      data: null,
    });
  }
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

const getRecommended = async (_: Request, resp: Response) => {
  try {
    const randomProducts = await productService.getRandom(10);

    resp.status(200).send(randomProducts);
  } catch {
    resp.status(500).send('Error');
  }
};

const getNew = async (_: Request, resp: Response) => {
  try {
    const products = await productService.getNew();

    resp.status(200).send(products);
  } catch (error) {
    resp.status(500).send({
      data: null,
    });
  }
};

const getDiscount = async (_: Request, resp: Response) => {
  try {
    const products = await productService.getDiscount();

    resp.status(200).send(products);
  } catch (error) {
    resp.status(500).send({
      data: null,
    });
  }
};

export default {
  getAll,
  getOne,
  getOneByDetails,
  getFiltered,
  getRecommended,
  getNew,
  getDiscount,
};
