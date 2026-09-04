import 'dotenv/config';
import app from './app.js';
import { env } from './config/env.js';
import {checkDatabase} from "./database/check.js";

const PORT = env.PORT;

const start = async () => {
    try {
        await checkDatabase();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start application', error);
        process.exit(1);
    }
};

void start();