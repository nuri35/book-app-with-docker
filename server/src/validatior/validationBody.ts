import { body, ValidationChain } from 'express-validator';
import mongoose from 'mongoose';

const validation = {
  createBookValidate: [
    body('authorId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('authorId must be provided'),
    body('title')
      .not()
      .isInt()
      .withMessage('title must be string')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('ISBN')
      .not()
      .isInt()
      .withMessage('ISBN must be string')
      .not()
      .isEmpty()
      .withMessage('ISBN is required'),
    body('language')
      .not()
      .isInt()
      .withMessage('language must be string')
      .not()
      .isEmpty()
      .withMessage('Language is required'),
    body('pages')
      .isFloat({ gt: 0 })
      .withMessage('Pages must be greater than 0')
      .not()
      .isEmpty()
      .withMessage('Pages is required'),
    body('publisher')
      .not()
      .isInt()
      .withMessage('publisher must be string')
      .not()
      .isEmpty()
      .withMessage('Publisher is required'),
  ],
  updateBookValidate: [
    body('title')
      .not()
      .isInt()
      .withMessage('title must be string')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('ISBN')
      .not()
      .isInt()
      .withMessage('ISBN must be string')
      .not()
      .isEmpty()
      .withMessage('ISBN is required'),
    body('language')
      .not()
      .isInt()
      .withMessage('language must be string')
      .not()
      .isEmpty()
      .withMessage('Language is required'),
    body('pages')
      .isFloat({ gt: 0 })
      .withMessage('Pages must be greater than 0')
      .not()
      .isEmpty()
      .withMessage('Pages is required'),
    body('publisher')
      .not()
      .isInt()
      .withMessage('publisher must be string')
      .not()
      .isEmpty()
      .withMessage('Publisher is required'),
  ],
  createAuthorValidate: [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a string.'),
    body('country')
      .not()
      .isEmpty()
      .withMessage('Country is required')
      .isString()
      .withMessage('Country must be a string.'),
    body('birthDate') // format "2001/12/01" or "2001-12-01"
      .not()
      .isEmpty()
      .withMessage('BirthDate is required')
      .isDate()
      .withMessage('Enter a valid date.'),
  ],
};

export { validation };
