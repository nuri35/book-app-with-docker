import request from 'supertest';
import { app } from '../../app';
import { BookExpected } from '../../test-setup/setting';

it('has a route handler for get requests on book', async () => {
  await global.bookCreate();
  const response = await request(app).get('/api/books').send().expect(200);

  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThanOrEqual(0);
  expect(response.body).toBeDefined();
  response.body.forEach((book: BookExpected) => {
    expect(book).toMatchObject({
      title: expect.any(String),
      price: expect.any(Number),
      ISBN: expect.any(String),
      language: expect.any(String),
      pages: expect.any(Number),
      publisher: expect.any(String),
      id: expect.any(String),
    });
    expect(book.author).toBeDefined();
  });
});
