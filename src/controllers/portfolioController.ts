import { NextFunction, Request, Response } from 'express';
import { portfolioService } from '../di/services';
import JsonResponse from "../models/jsonResponse";

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user = await portfolioService.getUser();

    let jsonResponse = new JsonResponse();

    if (user.error) {
        jsonResponse.setStatusError();

        if (user.message) {
            jsonResponse.setException(`Error while trying to get user: ${user.message}`);
        }

        return res.status(500).json(jsonResponse);
    }

    jsonResponse.setStatusOk().setData(user.data);

    return res.status(200).json(jsonResponse);
}

const getRepositories = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const repositories = await portfolioService.getRepositories(!!req.query.groupByLanguage);

    let jsonResponse = new JsonResponse();

    if (repositories.error) {
        jsonResponse.setStatusError();

        if (repositories.message) {
            jsonResponse.setException(`Error while trying to get repositories: ${repositories.message}`);
        }

        return res.status(500).json(jsonResponse);
    }

    jsonResponse.setStatusOk().setData(repositories.data);

    return res.status(200).json(jsonResponse);
}

export default {
    getUser,
    getRepositories,
};