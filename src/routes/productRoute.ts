import express, { NextFunction, Request, Response } from 'express';

import productController from '../controllers/productController';

const router = express.Router();

interface ReqQuery {
  query: string;
}

const isQuery = (
  req: Request<{}, {}, {}, ReqQuery>,
  resp: Response,
  next: NextFunction,
) => {
  const { query } = req.query;

  if (query) {
    return next();
  }

  return next('route');
};

const checkPhoneDetails = (
  req: Request,
  resp: Response,
  next: NextFunction,
) => {
  const { color, capacity } = req.query;

  if (color || capacity) {
    return next();
  }

  return next('route');
};

router.get('/', productController.getAll);
router.get('/', isQuery, productController.getFiltered);
router.get('/new', productController.getNew);
router.get('/discount', productController.getDiscount);
router.get('/:id', checkPhoneDetails, productController.getOneByDetails);
router.get('/:id', productController.getOne);
router.get('/:id/recommended', productController.getRecommended);

export default router;
