import { Router } from 'express';
import { createProduct, getProduct, getProducts } from '../controllers/product';
import { validateCreateProduct, validateProductId } from '../middlewares/validation';

const router = Router();
router.get('/product', getProducts);
router.get('/product/:productId', validateProductId, getProduct);
router.post('/product', validateCreateProduct, createProduct);

export default router;
