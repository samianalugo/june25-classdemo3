const request = require('supertest');
const { app, formatGreeting } = require('../app');

describe('Greeting App Tests', () => {
    // Unit test for greeting formatter
    describe('formatGreeting function', () => {
        test('formats greeting with provided name', () => {
            expect(formatGreeting('John')).toBe('Hello, John! Welcome to our application.');
        });
    });

    // Integration tests for routes
    describe('GET /', () => {
        test('responds with HTML containing the form', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('<form action="/greet" method="post">');
        });
    });

    describe('POST /greet', () => {
        test('responds with greeting using provided name', async () => {
            const response = await request(app)
                .post('/greet')
                .send('name=TestUser')
                .set('Content-Type', 'application/x-www-form-urlencoded');

            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Hello, TestUser!');
        });

        test('uses "Guest" when no name is provided', async () => {
            const response = await request(app)
                .post('/greet')
                .send('name=')
                .set('Content-Type', 'application/x-www-form-urlencoded');

            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Hello, Guest!');
        });
    });
});