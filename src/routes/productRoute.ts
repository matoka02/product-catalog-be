import express, { NextFunction, Request, Response } from 'express';

import productController from '../controllers/productController';

const router = express.Router();

interface ReqQuery {
  query: string;
}

const isQuery = (
  req: Request<{}, {}, {}, ReqQuery>,
  resp: Response,
  next: NextFunction
) => {
  const { query } = req.query;

  if (query) {
    return next();
  }

  return next('route');
}

const isType = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const { type } = req.query;

  if (type) {
    return next();
  }

  return next('route');
}



router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.get('/', isQuery, productController.getFiltered);
router.get('/:id/recommended', productController.getRecommended);
router.get('/', isType, productController.getByType);

export default router;

