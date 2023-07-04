import express from 'express';
import { json } from 'body-parser';
require('express-async-errors');
import { errorHandler, NotFoundError } from '@fbticketss/common'; //  I wrote this package myself
import { bookRouter } from './routes/book';
import { authorRouter } from './routes/author';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(bookRouter);
app.use(authorRouter);

app.all('*', async (req, res) => {
  //
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
