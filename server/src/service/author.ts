import { Author, AuthorAttrs } from './../models/author';

class AuthorService {
  async createAuthor(data: AuthorAttrs) {
    const { name, country, birthDate } = data;
    try {
      const author = Author.build({
        name,
        country,
        birthDate,
      });
      await author.save();
      return author;
    } catch (error) {
      throw error;
    }
  }
}
const AuthorSrv = new AuthorService();
export { AuthorSrv };
