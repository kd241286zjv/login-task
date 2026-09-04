import { RowDataPacket } from 'mysql2';

export type RefreshToken = RowDataPacket & {
  id: number;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
};
