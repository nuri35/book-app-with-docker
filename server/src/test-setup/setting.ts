import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: any;

interface AuthorResponse {
  message: string;
  authorId: string;
}

export interface BookExpected {
  title: string;
  price: number;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
  id: string;
  author: {
    name: string;
    country: string;
    birthDate: string;
    id: string;
  };
}

interface BookResponse {
  message: string;
  copiedBook: BookExpected;
}

declare global {
  var authorCreate: () => Promise<AuthorResponse>;
  var bookCreate: () => Promise<BookResponse>;
  var generateId: () => string;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.authorCreate = async () => {
  const response = await request(app)
    .post('/api/author')
    .send({
      name: 'asdasd',
      country: 'turkey',
      birthDate: '1995-01-01',
    })

    .expect(201);
  return response.body;
};

global.bookCreate = async () => {
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

  return response.body;
};

global.generateId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
