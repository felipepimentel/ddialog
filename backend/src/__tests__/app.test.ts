import request from 'supertest';
import app from '../app';

describe('User Routes', () => {
  it('should respond to /api/users/register', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
  });
});