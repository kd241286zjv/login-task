import { Request, Response } from 'express';
import { UsersService } from './users.service.js';
import { registerSchema } from './users.schemas.js';

export class UsersController {
  constructor(private service: UsersService) {}

  async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { email, password } = result.data;

    const user = await this.service.register(email, password);

    return res.status(201).json(user);
  }

  async me(req: Request, res: Response) {
    const user = await this.service.findById(req.userId);

    return res.status(200).json(user);
  }
}
