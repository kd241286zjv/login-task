import { pool } from "./mysql.js";

export const checkDatabase = async () => {
    try {
        await pool.query('SELECT 1')
        console.log('Database connection established')
    } catch (e) {
        console.error('Database connection failed', e);
        throw e;
    }
}