import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: Number(process.env.MYSQL_PORT),
    DATABASE: process.env.MYSQL_DATABASE,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
  },
};
