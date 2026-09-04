import { createPool } from 'mysql2/promise';
import { env } from '../config/env.js';

export const pool = createPool({
  host: env.MYSQL.HOST,
  port: env.MYSQL.PORT,
  database: env.MYSQL.DATABASE,
  user: env.MYSQL.USER,
  password: env.MYSQL.PASSWORD,
  connectionLimit: 10,
});
