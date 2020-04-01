import { MongoDB, DatabaseInfo } from 'flexiblepersistence';

const eventDatabase = new MongoDB(
  new DatabaseInfo({
    uri: process.env.MONGO_URI,
    database: process.env.MONGO_DATABASE || 'write',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  })
);

export default eventDatabase;
