import express, { NextFunction, Request, Response } from 'express';
import { loggerService } from "./di/services";
import config from './config/config';
import { apiBaseUrl } from './constants';
import dotenv from 'dotenv';
import statusRoutes from './routes/statusRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import JsonResponse from "./models/jsonResponse";

const NAMESPACE = 'server';

const app = express();

dotenv.config();

/** Log the request (if not running tests) */
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.on('finish', (): void => {
            loggerService.info(NAMESPACE, `[${req.socket.remoteAddress}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
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
        return res.status(200).json(new JsonResponse());
    }

    next();
});

/** Routes */

app.use(apiBaseUrl, statusRoutes);
app.use(apiBaseUrl, portfolioRoutes);

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction): Response => {
    const jsonResponse = new JsonResponse().setStatusError().setMessage('Not found');
    return res.status(404).json(jsonResponse);
});

module.exports = app;