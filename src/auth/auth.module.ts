import { Router } from 'express';
import { UsersRepository } from '../users/users.repository.js';
import { UsersService } from '../users/users.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

export const authModule = () => {
  const repository = new UsersRepository();
  const usersService = new UsersService(repository);
  const authService = new AuthService(usersService);
  const controller = new AuthController(authService);

  const router = Router();

  router.post('/auth/login', controller.login.bind(controller));

  return router;
};
