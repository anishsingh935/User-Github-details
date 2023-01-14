import httpStatus from 'http-status';
import logger from '../config/logger';
import { githubService } from '../services';

export const getUserInfo = async (req, res, next) => {
  try {
    const { userName } = req.params;
    logger.info('get userinfo controller', { userName });
    const user = await githubService.getUserInfo(userName);
    logger.info('user', user);
    return res.status(httpStatus.OK).json(user);
  } catch (err) {
    return next(err);
  }
};

export const getRepos = async (req, res, next) => {
  try {
    const { query } = req;
    logger.info('get repos controller', { query });
    const repos = await githubService.getRepos(query);
    logger.info('repos', repos);
    return res.status(httpStatus.OK).json(repos);
  } catch (err) {
    return next(err);
  }
};
