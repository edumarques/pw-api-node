import { NextFunction, Request, Response } from 'express';

const checkAppStatus = (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(200).json({
        connected: true,
    });
};

export default { checkAppStatus };