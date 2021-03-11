const request = require('supertest');
const app = require('../server');

describe('Error handling', () => {
    it('should handle route that is not registered', async () => {
        const response = await request(app).get('/route/not/registered');

        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({ message: 'Not found' });
    });
});