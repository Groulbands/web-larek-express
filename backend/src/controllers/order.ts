import { randomUUID } from 'node:crypto';
import { RequestHandler } from 'express';
import Product from '../models/product';
import { BadRequestError } from '../errors/http-error';
import { calculateOrderTotalCents, matchesOrderTotal, OrderValidationError } from '../utils/order-calculation';

type OrderBody = {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const { items, total } = req.body as OrderBody;
    const products = await Product.find({ _id: { $in: items } });
    const calculatedTotalCents = calculateOrderTotalCents(
      items,
      products.map((product) => ({ id: product._id.toString(), price: product.price })),
    );

    if (!matchesOrderTotal(calculatedTotalCents, total)) {
      throw new BadRequestError('Неверная сумма заказа');
    }

    res.status(200).json({ id: randomUUID(), total });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      next(new BadRequestError(error.message));
      return;
    }
    next(error);
  }
};
