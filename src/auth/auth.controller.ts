import { Request, Response } from 'express';
import { UsersService } from '../users/users.service.js';
import { loginSchema } from '../users/users.schemas.js';

export class AuthController {
  constructor(private usersService: UsersService) {}

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { email, password } = result.data;

    const user = await this.usersService.login(email, password);

    return res.status(200).json(user);
  }
}
