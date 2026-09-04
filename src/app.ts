import express from 'express';
import { createUsersModule } from './users/users.module.js';
import { errorHandler } from './common/middleware/error-handler.js';
import { authModule } from './auth/auth.module.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(createUsersModule());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);
app.use(authModule());

export default app;
