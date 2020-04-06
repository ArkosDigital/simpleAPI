import { DatabaseInfo } from 'flexiblepersistence';

const database = new DatabaseInfo({
  database: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'evox2019',
});

export default database;
