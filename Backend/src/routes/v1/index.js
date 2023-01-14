import express from 'express';
import githubRoute from './gihub.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/github',
    route: githubRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
