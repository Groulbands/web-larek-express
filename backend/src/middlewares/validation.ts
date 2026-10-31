import { celebrate, Joi, Segments } from 'celebrate';

const mongoId = Joi.string().hex().length(24).required();

const image = Joi.object({
  fileName: Joi.string().required(),
  originalName: Joi.string().required(),
}).required();

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    image,
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).optional(),
  }).required(),
});

export const validateProductId = celebrate({
  [Segments.PARAMS]: Joi.object({ productId: mongoId }).required(),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().min(0).required(),
    items: Joi.array().items(mongoId).min(1).required(),
  }).required(),
});
