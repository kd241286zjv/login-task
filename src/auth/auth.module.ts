import { Router } from 'express';
import { UsersRepository } from '../users/users.repository.js';
import { UsersService } from '../users/users.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { RefreshTokensRepository } from './refresh-tokens.repository';

export const authModule = () => {
  const usersRepository = new UsersRepository();
  const refreshTokensRepository = new RefreshTokensRepository();
  const usersService = new UsersService(usersRepository);
  const authService = new AuthService(usersService, refreshTokensRepository);
  const controller = new AuthController(authService);

  const router = Router();

  router.post('/auth/login', controller.login.bind(controller));
  router.post('/auth/logout', controller.logout.bind(controller));
  router.post('/auth/refresh', controller.refresh.bind(controller));

  return router;
};
