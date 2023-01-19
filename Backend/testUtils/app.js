import helmet from 'helmet';
import express from 'express';
import httpStatus from 'http-status';
import cors from 'cors';
import { errorConverter, errorHandler } from '../src/middlewares/error';
import ApiError from '../src/utils/ApiError';
import routes from '../src/routes/v1';
import { NOT_FOUND } from '../src/utils/errorMessage';

const app = express();

app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(async (req, res, next) => {
//   req.user = {
//     _id: '626bcc874d10591767685830',
//     roleId: '627955212019dc8e78e71ba6',
//     companyId: '627bc40188525761a5ac8d5f',
//   };
//   return next();
// });

app.get('/', (_, res) =>
  res.json({
    msg: 'Default end point',
  })
);
// require('../src/models/index');

app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
