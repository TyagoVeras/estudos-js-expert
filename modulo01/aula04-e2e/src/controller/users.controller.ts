import { Request, Response } from 'express';
class UsersController {
  static getUsers() {
    return (req: Request, res: Response) => {
      res.json({ send: 'oks' });
    };
  }
}

export { UsersController };
