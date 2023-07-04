import mongoose from 'mongoose';
import { AuthorDoc } from './author';

interface BookAttrs {
  title: string;
  price: number;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
  author: AuthorDoc;
}

export interface BookBodyCreate {
  title: string;
  price: number;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
  authorId: string;
}

export interface BookBodyUpdate {
  title: string;
  price: number;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;
}

export interface BookDoc extends mongoose.Document {
  title: string;
  price: number;
  ISBN: string;
  language: string;
  pages: number;
  publisher: string;
  author: AuthorDoc;
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
