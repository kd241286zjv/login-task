import { pool } from '../database/mysql.js';
import { User } from './users.types.js';
import { v4 as uuidv4 } from 'uuid';

export class UsersRepository {
    async findByEmail(email: string) {
        const [rows] = await pool.query<User[]>(
            `
                SELECT id, email, password_hash, created_at, updated_at
                FROM users
                WHERE email = ? LIMIT 1
            `,
            [email]
        );

        return rows[0];
    }

    async createUser(
        email: string,
        passwordHash: string
    ) {
        const id = uuidv4();

        await pool.query(
        `
                    INSERT INTO users (id, email, password_hash)
                    VALUES (?, ?, ?)
                `,
            [id, email, passwordHash]
        );

        return id;
    }
}