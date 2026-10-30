import { RequestHandler } from 'express';
import Product, { IProduct } from '../models/product';
import { NotFoundError } from '../errors/http-error';

export const getProducts: RequestHandler = (_req, res, next) => {
  Product.find()
    .then((items) => res.status(200).json({ items, total: items.length }))
    .catch(next);
};

export const getProduct: RequestHandler = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) throw new NotFoundError('Товар не найден');
      return res.status(200).json(product);
    })
    .catch(next);
};

export const createProduct: RequestHandler = (req, res, next) => {
  Product.create(req.body as IProduct)
    .then((product) => res.status(200).json(product))
    .catch(next);
};
