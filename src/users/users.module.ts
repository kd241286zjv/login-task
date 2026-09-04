import { Router } from 'express';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

export const createUsersModule = () => {
    const repository = new UsersRepository();
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const router = Router();
    router.post('/users', controller.register.bind(controller));

    return router;
};