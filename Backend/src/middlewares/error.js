import httpStatus from 'http-status';
import { env } from '../config/config';
import ApiError from '../utils/ApiError';
import logger from '../config/logger';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env === 'prod' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(env !== 'prod' && { stack: err.stack }),
  };

  if (env !== 'prod') {
    logger.error('errorHandler', err);
  }

  res.status(statusCode).send(response);
};
