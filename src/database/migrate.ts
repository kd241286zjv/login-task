import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from './mysql.js';
import {RowDataPacket} from "mysql2";

type MigrationRow = RowDataPacket & {
    name: string;
};

const migrate = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
                                                  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                                  name VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
    `);

    const migrationsDir = path.join(__dirname, 'migrations');

    const files = await fs.readdir(migrationsDir);

    const migrations = files
        .filter(file => file.endsWith('.sql'))
        .sort();

    console.log(migrations);

    const [rows] = await pool.query<
        MigrationRow[]
    >(
        'SELECT name FROM migrations ORDER BY id'
    );

    const executedMigrations = new Set(
        rows.map(row => row.name)
    );

    const pendingMigrations = migrations.filter(
        migration => !executedMigrations.has(migration)
    );

    for (const migration of pendingMigrations) {
        const filePath = path.join(migrationsDir, migration);

        const sql = await fs.readFile(filePath, 'utf-8');

        await pool.query(sql);

        await pool.query(
            'INSERT INTO migrations (name) VALUES (?)',
            [migration]
        );

        console.log(`Migration applied: ${migration}`);
    }

    await pool.end();
};

migrate().catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
});