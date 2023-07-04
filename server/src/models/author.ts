import mongoose from 'mongoose';

export interface AuthorAttrs {
  name: string;
  country: string;
  birthDate: Date;
}

interface AuthorModel extends mongoose.Model<AuthorDoc> {
  build(attrs: AuthorAttrs): AuthorDoc;
}

export interface AuthorDoc extends mongoose.Document {
  name: string;
  country: string;
  birthDate: Date;
}

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    birthDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
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

authorSchema.statics.build = (attrs: AuthorAttrs) => {
  return new Author(attrs);
};

const Author = mongoose.model<AuthorDoc, AuthorModel>('Author', authorSchema);

export { Author };
