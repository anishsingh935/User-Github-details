import request from 'supertest';
import logger from '../src/config/logger';
import app from '../testUtils/app';

describe('test all routes', () => {
  const validUserName = 'johnpapa';
  const invalidUserName = 'johnpap12345';
  const pageLimit = 5;
  // Positive test of user info
  test('should get profile info of valid user', async () => {
    const response = await request(app).get(`/github/user/${validUserName}`);
    logger.info('get userInfo: ', response.body.login);
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.body.login).toBe(validUserName);
  });
  // Negative test of user info
  test('should not get profile info of invalid user', async () => {
    const response = await request(app).get(`/github/user/${invalidUserName}`);
    logger.info('get userInfo: ', response.status);
    expect(response).not.toBeNull();
    expect(response.status).not.toBe(200);
    expect(response.status).toBe(404);
  });

  // Positive test for repos of user
  test('should get repos of valid user', async () => {
    const response = await request(app).get(`/github/repos?userName=${validUserName}&page=1&limit=${pageLimit}`);
    logger.info('repos: ', response.body.length);
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(pageLimit);
  });
  // Neagtive test for repos of user
  test('should not get profile info of invalid user', async () => {
    const response = await request(app).get(`/github/repos?userName=${invalidUserName}&page=1&limit=${pageLimit}`);
    logger.info('get userInfo: ', response.status);
    expect(response).not.toBeNull();
    expect(response.status).not.toBe(200);
    expect(response.status).toBe(404);
  });
});
