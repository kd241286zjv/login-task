import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UsersService } from '../users/users.service.js';
import { RefreshTokensRepository } from './refresh-tokens.repository.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL_MS } from './auth.config.js';
import { AppError } from '../common/errors/app-error';

export class AuthService {
  constructor(
    private usersService: UsersService,
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  private async createTokenPair(userId: string) {
    const accessToken = jwt.sign({ sub: userId }, env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
    });

    const refreshToken = crypto.randomBytes(32).toString('hex');

    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    await this.refreshTokensRepository.create(userId, tokenHash, expiresAt);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.login(email, password);

    return this.createTokenPair(user.id);
  }

  async refresh(refreshToken: string) {
    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const storedToken =
      await this.refreshTokensRepository.findByTokenHash(tokenHash);

    if (!storedToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    if (storedToken.expires_at <= new Date()) {
      await this.refreshTokensRepository.deleteById(storedToken.id);

      throw new AppError('Refresh token expired', 401);
    }

    await this.refreshTokensRepository.deleteById(storedToken.id);

    return this.createTokenPair(storedToken.user_id);
  }
}
