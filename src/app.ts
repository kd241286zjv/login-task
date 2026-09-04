import express from 'express';
import {createUsersModule} from "./users/users.module.js";

const app = express();

app.use(express.json());
app.use(createUsersModule());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;