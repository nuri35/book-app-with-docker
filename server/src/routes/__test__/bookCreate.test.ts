import request from 'supertest';
import { app } from '../../app';

it('has a route handler for post requests on book', async () => {
  const { authorId } = await global.authorCreate();
  const response = await request(app)
    .post('/api/book')
    .send({
      authorId: authorId,
      title: 'asdasd',
      price: 20,
      ISBN: 'asdasd',
      language: 'French',
      pages: 20,
      publisher: 'abc evim',
    })
    .expect(201);

  expect(response.body).toBeDefined();
  expect(response.body.copiedBook).toBeDefined();
  expect(response.body.message).toBeDefined();
  expect(response.body.message).toEqual('Book created successfully');
  expect(response.body.copiedBook).toEqual(
    expect.objectContaining({
      title: expect.any(String),
      price: expect.any(Number),
      ISBN: expect.any(String),
      language: expect.any(String),
      pages: expect.any(Number),
      publisher: expect.any(String),
      id: expect.any(String),
    })
  );
  expect(response.body.copiedBook.author).toBeDefined();
  expect(response.body.copiedBook.price).toBeGreaterThanOrEqual(0);
});

it('returns an error if the author does not exist', async () => {
  const id = global.generateId();
  await request(app)
    .post('/api/book')
    .send({
      authorId: id,
      title: 'asdasd',
      price: 20,
      ISBN: 'asdasd',
      language: 'French',
      pages: 20,
      publisher: 'abc evim',
    })
    .expect(404);
});

it('returns an error if the  body is invalid', async () => {
  await request(app)
    .post('/api/book')
    .send({
      title: '',
      price: 20,
      ISBN: 'asdasd',
      language: 'French',
    })
    .expect(400);
});
