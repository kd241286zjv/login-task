import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { loginSchema } from '../users/users.schemas.js';
import { env } from '../config/env';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { email, password } = result.data;

    const token = await this.authService.login(email, password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.status(200).json({
      message: 'Logged in successfully',
    });
  }
}
