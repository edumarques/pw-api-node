import express, { NextFunction, Request, Response } from 'express';
import logging from './config/logging';
import config from './config/config';
import statusRoutes from './routes/statusRoutes';
import constants from './constants';
import dotenv from 'dotenv';

const NAMESPACE = 'server';

const app = express();

dotenv.config();

/** Log the request (if not running tests) */
if (process.env.NODE_ENV !== 'test') {
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.on('finish', (): void => {
            logging.info(NAMESPACE, `[${req.socket.remoteAddress}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
        })

        next();
    });
}

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of the API */
app.use((req: Request, res: Response, next: NextFunction): Response | void => {
    res.header('Access-Control-Allow-Origin', `${config.authorizedOrigin}`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */

app.use(constants.apiBaseUrl, statusRoutes);

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        message: 'Not found'
    });
});

module.exports = app;