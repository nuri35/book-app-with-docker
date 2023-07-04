import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the route is not found', async () => {
  await request(app).get('/api/invalid').send().expect(404);
});
