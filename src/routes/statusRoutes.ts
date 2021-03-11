import express from 'express';
import statusController from '../controllers/statusController';
import constants from '../constants';

const router = express.Router();
const baseUrl = constants.statusUrl;

router.get(`${baseUrl}/`, statusController.checkAppStatus);

export = router;