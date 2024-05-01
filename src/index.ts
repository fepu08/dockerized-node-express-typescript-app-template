import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middlewares/error-middleware';
import dummyRouter from './api/v1/dummy/dummy-routes';
import { apiMethodLoggingMiddleware } from './middlewares/api-method-logger-middleware';

const port = process.env.PORT || 3000;
const app = express();

/* Middlewares */
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(apiMethodLoggingMiddleware);

/* Routes */
/* Test Routes */
app.get('/', (_req, res) => {
  res.send('API is running...');
});
app.use('/dummy', dummyRouter);

app.get('/test-error', (_req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }
  throw new Error('test');
});

app.get('/test/uncaught-exception', (_req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }
  throw new Error('test');
});

app.get('/test/unhandled-rejection', (_req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  void Promise.reject('test unhandled rejection');
});

/* Error middlewares & Event Listeners */
app.use(notFound);
app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
  console.error(`unhandled rejection: ${JSON.stringify(reason)}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err.message}`);
  console.error(err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
