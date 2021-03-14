import { apiBaseUrl, statusUrl } from "../../constants";

const request = require('supertest');
const app = require('../../server');
const baseUrl = apiBaseUrl + statusUrl;

describe('Status Endpoints', (): void => {
    it('should check app status', async (): Promise<any> => {
        const response = await request(app).get(baseUrl);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toStrictEqual({ connected: true });
    });
});