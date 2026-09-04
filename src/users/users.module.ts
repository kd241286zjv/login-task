import { Router } from 'express';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { authMiddleware } from '../common/middleware/auth.middleware.js';

export const createUsersModule = () => {
  const repository = new UsersRepository();
  const service = new UsersService(repository);
  const controller = new UsersController(service);
  const router = Router();
  router.post('/users', controller.register.bind(controller));
  router.get('/users/me', authMiddleware, controller.me.bind(controller));

  return router;
};
