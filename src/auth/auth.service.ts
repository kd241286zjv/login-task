import { UsersService } from '../users/users.service.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.login(email, password);

    return jwt.sign({ sub: user.id }, env.JWT_SECRET);
  }
}
