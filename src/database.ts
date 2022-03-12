import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const Client : Pool = new Pool({
    user:  process.env.ENV === 'test' ? process.env.PG_USER_TEST :process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT as string),
    database:
      process.env.ENV === 'test' ? process.env.PG_DB_TEST : process.env.PG_DB
  });