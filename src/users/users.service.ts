import { UsersRepository } from './users.repository.js';
import bcrypt from 'bcrypt';
import { AppError } from '../common/errors/app-error';

export class UsersService {
  constructor(private repository: UsersRepository) {}
  async register(email: string, password: string) {
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const id = await this.repository.createUser(email, passwordHash);

    return { id, email };
  }

  async findById(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      throw new AppError('Invalid credentials', 401);
    }

    return user;
  }
}
