import { Router } from 'express';
import { UsersRepository } from '../users/users.repository.js';
import { UsersService } from '../users/users.service.js';
import { AuthController } from './auth.controller.js';

export const authModule = () => {
  const repository = new UsersRepository();
  const service = new UsersService(repository);
  const controller = new AuthController(service);

  const router = Router();

  router.post('/auth/login', controller.login.bind(controller));

  return router;
};
