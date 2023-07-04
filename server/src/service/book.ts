import {
  Book,
  BookBodyCreate,
  BookBodyUpdate,
  BookDoc,
} from './../models/book';
import { Author } from './../models/author';
import { NotFoundError } from '@fbticketss/common';

class BookService {
  async createBook(data: BookBodyCreate) {
    const { title, price, ISBN, language, pages, publisher, authorId } = data;

    try {
      const author = await Author.findById(authorId);

      if (!author) {
        throw new NotFoundError();
      }
      const book = Book.build({
        title,
        price,
        ISBN,
        language,
        pages,
        publisher,
        author,
      });
      await book.save();
      const copiedBook: BookDoc = Object.create(
        Object.getPrototypeOf(book),
        Object.getOwnPropertyDescriptors(book)
      );
      return copiedBook;
    } catch (error) {
      throw error;
    }
  }

  async getBooks() {
    try {
      const books = await Book.find({}).populate('author');
      return books;
    } catch (error) {
      throw error;
    }
  }
  async deleteBook(bookId: string) {
    try {
      const deletedBook = await Book.findOneAndDelete({ _id: bookId });
      if (!deletedBook) {
        throw new NotFoundError();
      }
    } catch (error) {
      throw error;
    }
  }

  async updateBook(bookId: string, data: BookBodyUpdate) {
    const { title, price, ISBN, language, pages, publisher } = data;
    try {
      const book = await Book.findById(bookId);

      if (!book) {
        throw new NotFoundError();
      }
      book.set({
        title,
        price,
        ISBN,
        language,
        pages,
        publisher,
      });

      await book.save();
    } catch (error) {
      throw error;
    }
  }
}
const BookSrv = new BookService();
export { BookSrv };
