import axios from 'axios';
import { GITHUB_ACCESS_TOKEN } from '../config/config';
import { GITHUB_BASE_URL } from '../config/constants';
import logger from '../config/logger';

const headers = { Authorization: GITHUB_ACCESS_TOKEN };

export const getUserInfo = async (userName) => {
  logger.info('get User info of: ', userName);
  try {
    const response = await axios.get(`${GITHUB_BASE_URL}/users/${userName}`, { headers });
    return response.data;
  } catch (err) {
    logger.error('Error while fetching user info', err.message);
    throw err;
  }
};

export const getRepos = async (query) => {
  try {
    logger.info('get repos service: ', query);
    const { userName, page, limit } = query;
    const params = {};
    if (page) {
      params.page = page;
    }
    if (limit) {
      params.per_page = limit;
    }
    const response = await axios.get(`${GITHUB_BASE_URL}/users/${userName}/repos`, { params, headers });
    return response.data;
  } catch (err) {
    logger.error('Error while fetching user info', err.message);
    throw err;
  }
};
