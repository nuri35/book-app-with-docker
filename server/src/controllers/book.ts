import { Request, Response } from 'express';
import { Book } from './../models/book';
import { NotFoundError } from '@fbticketss/common';
import { StatusCodes } from 'http-status-codes';
import { BookSrv } from '../service/book';

class BookController {
  async createBookHandler(req: Request, res: Response) {
    try {
      const copiedBook = await BookSrv.createBook(req.body);
      return res.status(StatusCodes.CREATED).send({
        message: 'Book created successfully',
        copiedBook,
      });
    } catch (error) {
      throw error;
    }
  }

  async getBooksHandler(req: Request, res: Response) {
    try {
      const books = await BookSrv.getBooks();
      return res.status(StatusCodes.OK).send([...books]);
    } catch (error) {
      throw error;
    }
  }

  async deleteBookHandler(req: Request, res: Response) {
    const bookId = req.params.id;

    try {
      await BookSrv.deleteBook(bookId);
      return res.status(StatusCodes.OK).send({
        message: 'Book deleted successfully',
      });
    } catch (error) {
      throw error;
    }
  }

  async updateBookHandler(req: Request, res: Response) {
    const bookId = req.params.id;

    try {
      await BookSrv.updateBook(bookId, req.body);
      return res.status(StatusCodes.OK).send({
        message: 'Book updated successfully',
      });
    } catch (error) {
      throw error;
    }
  }
}

const BookCntrol = new BookController();
export { BookCntrol };
