import path from 'node:path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import NotFoundError from './errors/not-found-error';
import Product from './models/product';
import { errorHandler } from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';
import orderRouter from './routes/order';
import productRouter from './routes/product';

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
} = process.env;

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(requestLogger);
app.use(express.json());

app.use(express.static(path.resolve(process.cwd(), 'src/public')));
app.use(productRouter);
app.use(orderRouter);
app.use((_req, _res, next) => next(new NotFoundError('Маршрут не найден')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(async () => {
    await Product.init();
    app.listen(PORT, () => {
      console.log(`WebLarek API: http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Не удалось подключиться к MongoDB:', error);
    process.exitCode = 1;
  });

export default app;
