import { MongoDB, DatabaseInfo } from '../../source/index';

const eventDatabase = new MongoDB(
  new DatabaseInfo({
    database: 'write',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT,
  })
);

export default eventDatabase;
