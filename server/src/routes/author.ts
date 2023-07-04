import express from 'express';
import { validation } from './../validatior/validationBody';
import { validateRequest } from '@fbticketss/common';
import { AuthorCntrol } from './../controllers/author';

const router = express.Router();

router.post(
  '/api/author',
  validation.createAuthorValidate,
  validateRequest,
  AuthorCntrol.createAuthorHandler
);

export { router as authorRouter };
