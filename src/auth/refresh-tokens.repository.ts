import { pool } from '../database/mysql.js';
import { RefreshToken } from './auth.types.js';

export class RefreshTokensRepository {
  async create(userId: string, tokenHash: string, expiresAt: Date) {
    await pool.query(
      `
                INSERT INTO refresh_tokens (
                    user_id,
                    token_hash,
                    expires_at
                )
                VALUES (?, ?, ?)
            `,
      [userId, tokenHash, expiresAt]
    );
  }

  async findByTokenHash(tokenHash: string) {
    const [rows] = await pool.query<RefreshToken[]>(
      `
        SELECT
          id,
          user_id,
          token_hash,
          expires_at,
          created_at
        FROM refresh_tokens
        WHERE token_hash = ?
        LIMIT 1
      `,
      [tokenHash]
    );

    return rows[0];
  }

  async deleteById(id: number) {
    await pool.query(
      `
      DELETE FROM refresh_tokens
      WHERE id = ?
    `,
      [id]
    );
  }
}
