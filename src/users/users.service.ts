import { UsersRepository } from './users.repository.js';
import bcrypt from 'bcrypt';

export class UsersService {
    constructor(private repository: UsersRepository) {}
    async register(email: string, password: string) {
        const existingUser = await this.repository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const id = await this.repository.createUser(email, passwordHash);

        return { id, email };
    }
}