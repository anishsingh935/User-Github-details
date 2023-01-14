import express from 'express';
import { githubController } from '../../controllers';

const router = express.Router();

router.route('/user/:userName').get(githubController.getUserInfo);
router.route('/repos').get(githubController.getRepos);

export default router;
