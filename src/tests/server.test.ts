const request = require('supertest');
const app = require('../server');

describe('Error handling', (): void => {
    it('should handle route that is not registered', async (): Promise<any> => {
        const response = await request(app).get('/route/not/registered');

        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({ status: 'Error', message: 'Not found' });
    });
});

describe('OPTIONS request', (): void => {
    it('should handle OPTIONS request properly', async (): Promise<any> => {
        const response = await request(app).options('/');

        expect(response.headers).toHaveProperty('access-control-allow-methods', 'GET');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toStrictEqual({});
    });
});