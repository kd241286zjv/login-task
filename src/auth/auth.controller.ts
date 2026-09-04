import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { loginSchema } from '../users/users.schemas.js';
import { authCookieOptions } from './auth.cookie.js';
import { REFRESH_TOKEN_TTL_MS } from './auth.config.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { email, password } = result.data;

    const { accessToken, refreshToken } = await this.authService.login(
      email,
      password
    );

    res.cookie('access_token', accessToken, authCookieOptions);

    res.cookie('refresh_token', refreshToken, {
      ...authCookieOptions,
      maxAge: REFRESH_TOKEN_TTL_MS,
    });

    return res.status(200).json({
      message: 'Logged in successfully',
    });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('access_token', authCookieOptions);

    return res.status(204).send();
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    res.cookie('access_token', accessToken, authCookieOptions);

    res.cookie('refresh_token', newRefreshToken, {
      ...authCookieOptions,
      maxAge: REFRESH_TOKEN_TTL_MS,
    });

    return res.status(200).json({
      message: 'Token refreshed successfully',
    });
  }
}
