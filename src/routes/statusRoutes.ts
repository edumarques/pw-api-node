import express from 'express';
import statusController from '../controllers/statusController';
import { statusUrl } from '../constants';

const router = express.Router();

router.get(`${statusUrl}/`, statusController.checkAppStatus);

export = router;