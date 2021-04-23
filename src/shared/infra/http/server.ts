import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import '@shared/container';
import { errors } from 'celebrate';
import rateLimiter from '@shared/infra/http/middewares/rateLimiter';

const app = express();

app.use(cors());

app.use(
  cors({
    origin: 'http://127.0.0.1:3333',
  })
);

app.use(express.json());
app.listen(3333, () => {
  console.log('started on http://127.0.0.1:3333');
});

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);
