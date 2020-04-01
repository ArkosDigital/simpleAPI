import { MongoDB, DatabaseInfo } from 'flexiblepersistence';

const eventDatabase = new MongoDB(
  new DatabaseInfo({
    database: 'write',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT,
  })
);

export default eventDatabase;
