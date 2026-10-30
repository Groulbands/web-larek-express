import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (error instanceof BadRequestError
    || error instanceof ConflictError
    || error instanceof NotFoundError
  ) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError
      || error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error instanceof Error && 'code' in error && error.code === 11000) {
    res.status(409).json({ message: 'Товар с таким заголовком уже существует' });
    return;
  }

  if (error instanceof Error && 'status' in error && error.status === 400) {
    res.status(400).json({ message: 'Некорректный JSON в теле запроса' });
    return;
  }

  res.status(500).json({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;
