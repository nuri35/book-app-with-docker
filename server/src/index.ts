import mongoose from 'mongoose';
import { app } from './app';
import { Book } from './models/book';

const start = async () => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = process.env;
  if (!DB_HOST || !DB_NAME || !DB_PASSWORD || !DB_USER) {
    throw new Error('Database config must be defined');
  }

  try {
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    );
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
