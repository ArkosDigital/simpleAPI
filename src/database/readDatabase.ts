import { PostgresDB } from 'flexiblepersistence';
import database from '../config/database';

const readDatabase = new PostgresDB(database);

export default readDatabase;
