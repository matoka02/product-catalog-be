import express, {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import productController from '../controllers/productController';

const router = express.Router();

interface ReqQuery {
  query: string;
}

const isQuery = (
  req: ExpressRequest<{}, {}, {}, ReqQuery>,
  resp: ExpressResponse,
  next: NextFunction,
) => {
  const { query } = req.query;

  if (query) {
    return next();
  }

  return next('route');
};

const checkPhoneDetails = (
  req: ExpressRequest,
  resp: ExpressResponse,
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
