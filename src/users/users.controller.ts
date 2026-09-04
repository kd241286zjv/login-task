import { Request, Response } from 'express';
import { UsersService } from './users.service.js';

export class UsersController {
    constructor(private service: UsersService) {}

    async register(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.service.register(email, password);

        return res.status(201).json(user);
    }
}