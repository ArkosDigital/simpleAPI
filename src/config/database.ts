import { DatabaseInfo } from 'flexiblepersistence';

const database = new DatabaseInfo({
  uri: process.env.DATABASE_URL,
  username: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DATABASE || 'dbsimpleapi',
  password: process.env.POSTGRES_PASSWORD || 'evox2019',
  port: process.env.POSTGRES_PORT || 5432,
  ssl: process.env.POSTGRES_SSL
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
});

export default database;
