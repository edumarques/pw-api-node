import express from 'express';
import portfolioController from '../controllers/portfolioController';
import { portfolioUrl } from '../constants';

const router = express.Router();

router.get(`${portfolioUrl}/user`, portfolioController.getUser);
router.get(`${portfolioUrl}/repositories`, portfolioController.getRepositories);

export = router;