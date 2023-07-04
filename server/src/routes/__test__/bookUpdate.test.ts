import request from 'supertest';
import { app } from '../../app';

it('has a route handler for update requests on book', async () => {
  const {
    copiedBook: { id },
  } = await global.bookCreate();

  const response = await request(app)
    .put(`/api/book/${id}`)
    .send({
      title: 'new title',
      price: 20,
      ISBN: 'new ISBN',
      language: 'new language',
      pages: 20,
      publisher: 'new publisher',
    })
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body.message).toEqual('Book updated successfully');
});

it('returns a 404 if the provided id does not exist', async () => {
  const id = global.generateId();

  await request(app)
    .put(`/api/book/${id}`)
    .send({
      title: 'new title',
      price: 20,
      ISBN: 'new ISBN',
      language: 'new language',
      pages: 20,
      publisher: 'new publisher',
    })
    .expect(404);
});

it('returns a 400 if the user provides an invalid title', async () => {
  const {
    copiedBook: { id },
  } = await global.bookCreate();

  await request(app)
    .put(`/api/book/${id}`)
    .send({
      title: 2,
      price: 20,
      ISBN: 'new ISBN',
      language: 'new language',
      pages: 20,
      publisher: 'new publisher',
    })
    .expect(400);
});

it('returns a 400 if the book id is not valid', async () => {
  await request(app)
    .put(`/api/book/123`)
    .send({
      title: 'new title',
      price: 20,
      ISBN: 'new ISBN',
      language: 'new language',
      pages: 20,
      publisher: 'new publisher',
    })
    .expect(400);
});
