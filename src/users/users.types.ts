import { RowDataPacket } from 'mysql2';

export type User = RowDataPacket & {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
};
