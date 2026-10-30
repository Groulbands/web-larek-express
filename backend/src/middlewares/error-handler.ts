import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { HttpError } from '../errors/http-error';

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (error instanceof HttpError) {
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
