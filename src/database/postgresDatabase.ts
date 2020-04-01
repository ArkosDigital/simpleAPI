import { Pool } from 'pg';
import database from '../config/database';

const postgresDatabase = new Pool(database);

export default postgresDatabase;
