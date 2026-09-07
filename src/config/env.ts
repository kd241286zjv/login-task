import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  NODE_ENV: process.env.NODE_ENV || 'development',

  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: Number(process.env.MYSQL_PORT),
    DATABASE: process.env.MYSQL_DATABASE,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
  },

  JWT_SECRET,

  RABBITMQ: {
    URL: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  },
};
