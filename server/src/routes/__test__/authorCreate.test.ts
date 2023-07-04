import request from 'supertest';
import { app } from '../../app';
import { Author } from '../../models/author';

it('has a route handler for post requests on author', async () => {
  const response = await request(app)
    .post('/api/author')
    .send({
      name: 'author name',
      country: 'author country',
      birthDate: '2020-12-12',
    })
    .expect(201);

  expect(response.body.message).toBeDefined();
  expect(response.body.message).toEqual('Created');
  expect(response.body.authorId).toBeDefined();
});

it('returns an error if an invalid name is provided', async () => {
  await request(app)
    .post('/api/author')
    .send({
      country: 'author country',
      birthDate: '2020-12-12',
    })
    .expect(400);
});
