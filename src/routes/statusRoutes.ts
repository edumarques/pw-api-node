import express from 'express';
import statusController from '../controllers/statusController';

const router = express.Router();

router.get('/', statusController.checkAppStatus);

export = router;