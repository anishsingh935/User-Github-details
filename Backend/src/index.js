import helmet from 'helmet';
import express from 'express';
import serverless from 'serverless-http';
import httpStatus from 'http-status';
import cors from 'cors';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import routes from './routes/v1';
import { NOT_FOUND } from './utils/errorMessage';

const app = express();

app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(validateAuth);

app.get('/', (_, res) =>
  res.json({
    msg: 'Default end point',
  })
);
// require('./models/index');

app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

/* eslint-disable-next-line */
//export const handler = serverless(app);

// or as a promise
const h = serverless(app);

/* eslint-disable-next-line */
export const handler = async (event, context) => {
  const result = await h(event, context);
  return result;
};
