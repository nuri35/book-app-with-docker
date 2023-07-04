import request from 'supertest';
import { app } from '../../app';

it('has a route handler for delete requests on book', async () => {
  const {
    copiedBook: { id },
  } = await global.bookCreate();

  const response = await request(app)
    .delete(`/api/book/${id}`)
    .send()
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body.message).toEqual('Book deleted successfully');
});

it('returns a 404 if the book is not found', async () => {
  const id = global.generateId();

  await request(app).delete(`/api/book/${id}`).send().expect(404);
});

it('returns a 400 if the book id is not valid', async () => {
  await request(app).delete(`/api/book/123`).send().expect(400);
});
