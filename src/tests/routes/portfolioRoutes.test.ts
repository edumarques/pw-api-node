import { apiBaseUrl, portfolioUrl } from "../../constants";

const request = require('supertest');
const app = require('../../server');
const baseUrl = apiBaseUrl + portfolioUrl;

describe('Portfolio Endpoints', (): void => {
    it('should respond with 404 for route "/portfolio"', async (): Promise<any> => {
        const response = await request(app).get(baseUrl);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({ status: 'Error', message: 'Not found' });
    });

    it('should give a proper response for route "/portfolio/user"', async (): Promise<any> => {
        const response = await request(app).get(baseUrl + '/user');
        const { statusCode, body } = response;

        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('status', 'OK');
        expect(body).toHaveProperty('data.gitHub_avatar_url');
        expect(body).toHaveProperty('data.gitHub_bio');
        expect(body).toHaveProperty('data.gitHub_created_at');
        expect(body).toHaveProperty('data.gitHub_login');
        expect(body).toHaveProperty('data.gitHub_name');
        expect(body).toHaveProperty('data.gitHub_repos');
        expect(body).toHaveProperty('data.gitHub_updated_at');
        expect(body).toHaveProperty('data.gitHub_url');
    });

    it('should give a proper response for route "/portfolio/repositories"', async (): Promise<any> => {
        const response = await request(app).get(baseUrl + '/repositories');
        const { statusCode, body } = response;
        const data = body.data;
        const firstRepo = data[0];

        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('status', 'OK');
        expect(body).toHaveProperty('data');
        expect(data.length).toBeGreaterThan(1);
        expect(firstRepo).toHaveProperty('created_at');
        expect(firstRepo).toHaveProperty('description');
        expect(firstRepo).toHaveProperty('language');
        expect(firstRepo).toHaveProperty('name');
        expect(firstRepo).toHaveProperty('updated_at');
        expect(firstRepo).toHaveProperty('url');
    });

    it('should give a proper response for route "/portfolio/repositories?groupByLanguage=1"', async (): Promise<any> => {
        const response = await request(app).get(baseUrl + '/repositories?groupByLanguage=1');
        const { statusCode, body } = response;
        const data = body.data;
        const languages = Object.keys(data);
        const firstLanguage = languages[0];
        const firstRepo = data[firstLanguage][0];

        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('status', 'OK');
        expect(body).toHaveProperty('data');
        expect(languages.length).toBeGreaterThan(1);
        expect(firstRepo).toHaveProperty('created_at');
        expect(firstRepo).toHaveProperty('description');
        expect(firstRepo).toHaveProperty('language');
        expect(firstRepo).toHaveProperty('name');
        expect(firstRepo).toHaveProperty('updated_at');
        expect(firstRepo).toHaveProperty('url');
    });
});