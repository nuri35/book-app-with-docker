import express from 'express';
import { validateRequest } from '@fbticketss/common';
import { BookCntrol } from './../controllers/book';
import { validation } from './../validatior/validationBody';

const router = express.Router();

router.post(
  '/api/book',
  validation.createBookValidate,
  validateRequest,
  BookCntrol.createBookHandler
);

router.get('/api/books', BookCntrol.getBooksHandler);

router.delete('/api/book/:id', BookCntrol.deleteBookHandler);

router.put(
  '/api/book/:id',
  validation.updateBookValidate,
  validateRequest,
  BookCntrol.updateBookHandler
);

export { router as bookRouter };
