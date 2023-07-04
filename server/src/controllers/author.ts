import { Request, Response } from 'express';
import { AuthorSrv } from './../service/author';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
class AuthorController {
  async createAuthorHandler(req: Request, res: Response) {
    try {
      const author = await AuthorSrv.createAuthor(req.body);

      return res.status(StatusCodes.CREATED).send({
        message: ReasonPhrases.CREATED,
        authorId: author.id,
      });
    } catch (error) {
      throw error;
    }
  }
}
const AuthorCntrol = new AuthorController();
export { AuthorCntrol };
